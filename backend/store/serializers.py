from decimal import Decimal
from django.db import transaction
from rest_framework import serializers
from .models import Product, Review, Cart, CartItem, Customer, Order, OrderItem, Chapter, Lesson, Teacher, Details
from .signals import order_created


class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ['id', 'name', 'title', 'image'] 

class ProductSerializer(serializers.ModelSerializer):
    price_with_tax = serializers.SerializerMethodField(method_name='calculate_tax')
    members_count = serializers.SerializerMethodField(method_name='calculate_members_count')
    rate = serializers.SerializerMethodField(method_name='calculate_avg_rate',)
    teachers = TeacherSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'title', 'bio', 'description', 
                  'slug', 'price', 'price_with_tax', 
                  'image', 'available', 'teachers', 
                  'members_count', 'rate']

    def calculate_tax(self, product: Product):
        return product.price * Decimal(1.1)
    
    def calculate_members_count(self, product: Product):
        return product.orderitems.count()
    
    def calculate_avg_rate(self, product: Product):
        query = product.reviews.all() 
        count = query.count()
        if count == 0:
            return 5
        return sum([review.rate for review in query]) // count

class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = ['id', 'title', 'duration'] 

class ChapterSerializer(serializers.ModelSerializer):
    lessons = LessonSerializer(many=True, read_only=True)

    class Meta:
        model = Chapter
        fields = ['id', 'title', 'duration_Chapter', 'lesson_total', 'lessons'] 
    

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'rate', 'name', 'description', 'date']

    def create(self, validated_data):
        product_id = self.context['product_id']
        return Review.objects.create(product_id=product_id, **validated_data)


class DetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Details
        fields = ['status', 'progress', 'duration', 'support', 'requirement'] 


class ProductDetailSerializer(ProductSerializer):
    chapters = ChapterSerializer(many=True, read_only=True)
    reviews = ReviewSerializer(many=True, read_only=True)
    details = DetailsSerializer(many=False, read_only=True)

    class Meta(ProductSerializer.Meta):
        fields = ProductSerializer.Meta.fields + ['chapters', 'reviews', 'details', 'updated']


class SimpleProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'title', 'price']


class CartItemSerializer(serializers.ModelSerializer):
    product = SimpleProductSerializer()
    price = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'price']
    
    def get_price(self, cart_item: CartItem):
        return cart_item.product.price


class CartSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)
    items = CartItemSerializer(many=True, read_only=True)
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ['id', 'items', 'total_price']

    def get_total_price(self, cart):
        return sum([item.product.price for item in cart.items.all()])


class AddCartItemSerializer(serializers.ModelSerializer):
    product_id = serializers.IntegerField()

    class Meta:
        model = CartItem
        fields = ['id', 'product_id']

    def validate_product_id(self, value):
        if not Product.objects.filter(pk=value).exists():
            raise serializers.ValidationError('No product with the given ID was found.')
        return value

    def save(self, **kwargs):
        cart_id = self.context['cart_id']
        product_id = self.validated_data['product_id']

        try: 
            cart_item = CartItem.objects.get(cart_id=cart_id, product_id=product_id)
            self.instance = cart_item
        except CartItem.DoesNotExist:
            self.instance = CartItem.objects.create(cart_id=cart_id, **self.validated_data)
        
        return self.instance

    
class CustomerSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Customer
        fields = ['id', 'user_id', 'phone_number', 'birth_date', 'membership']


class OrderItemSerializer(serializers.ModelSerializer):
    product = SimpleProductSerializer()

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'price', 'license_code']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = ['id', 'customer', 'placed_at', 'payment_status', 'items']


class UpdateOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['payment_status']

class CreateOrderSerializer(serializers.Serializer):
    cart_id = serializers.UUIDField()

    def validate_cart_id(self, cart_id):
        if not Cart.objects.filter(pk=cart_id).exists():
            raise serializers.ValidationError('No cart with the given ID was found.')
        if CartItem.objects.filter(cart_id=cart_id).count() == 0:
            raise serializers.ValidationError('The cart is empty.')
        return cart_id

    def save(self, **kwargs):
        with transaction.atomic():
            cart_id = self.validated_data['cart_id']

            customer = Customer.objects.get(user_id=self.context['user_id'])
            order = Order.objects.create(customer=customer)

            cart_items = CartItem.objects \
                .select_related('product') \
                .filter(cart_id=cart_id)
            order_items = [
                OrderItem(
                    order=order,
                    product=item.product,
                    price=item.product.price,
                ) for item in cart_items
            ]
            OrderItem.objects.bulk_create(order_items)

            Cart.objects.filter(pk=cart_id).delete()

            order_created.send_robust(self.__class__, order=order)

            return order
