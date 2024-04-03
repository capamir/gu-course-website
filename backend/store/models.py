from django.db import models
from django.conf import settings
from django.contrib import admin
from django.core.validators import MaxValueValidator, MinValueValidator 
from uuid import uuid4

# Create your models here.
class Promotion(models.Model):
    description = models.CharField(max_length=255)
    discount = models.FloatField()


class Product(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField()
    bio = models.TextField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    price = models.IntegerField()
    available = models.BooleanField(default=True)
    updated = models.DateTimeField(auto_now=True)
    promotions = models.ManyToManyField(Promotion, blank=True)
    image = models.ImageField(null=True, blank=True, default="default.jpg")

    def __str__(self) -> str:
        return self.title
    
    class Meta:
        ordering = ['title']
    
    @property
    def reviewers(self):
        queryset = self.reviews.all()
        return queryset


class Details(models.Model):
    STATUS_A = "A"
    STATUS_B = "B"
    STATUS_C = "c"

    STATUS_CHOICES = [
        (STATUS_A, "پیش فروش"),
        (STATUS_B, "در حال ضبط"),
        (STATUS_C, "پایان ضبط"),
    ]

    product = models.OneToOneField(Product, on_delete=models.CASCADE)
    status = models.CharField(max_length=1, choices=STATUS_CHOICES, default=STATUS_A)
    duration_hours = models.PositiveIntegerField(default=0)
    duration_minutes = models.PositiveIntegerField(default=0)
    support = models.CharField(max_length=255, default="آنلاین")
    progress = models.PositiveIntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(100)])

    @property
    def duration(self):
        return f"{self.duration_hours} : {self.duration_minutes}"

    def __str__(self):
        return f"Course: {self.product}"



class Customer(models.Model):
    MEMBERSHIP_BRONZE = 'B'
    MEMBERSHIP_SILVER = 'S'
    MEMBERSHIP_GOLD = 'G'

    MEMBERSHIP_CHOICES = [
        (MEMBERSHIP_BRONZE, 'Bronze'),
        (MEMBERSHIP_SILVER, 'Silver'),
        (MEMBERSHIP_GOLD, 'Gold'),
    ]
    
    birth_date = models.DateField(null=True, blank=True)
    membership = models.CharField(
        max_length=1, choices=MEMBERSHIP_CHOICES, default=MEMBERSHIP_BRONZE)
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.user.full_name}'

    @admin.display(ordering='user__full_name')
    def full_name(self):
        return self.user.full_name
    
    @admin.display(ordering='user__phone_number')
    def phone_number(self):
        return self.user.phone_number

    @admin.display(ordering='user__email')
    def email(self):
        return self.user.email

    class Meta:
        ordering = ['user__full_name',]


class Order(models.Model):
    PAYMENT_STATUS_PENDING = 'P'
    PAYMENT_STATUS_COMPLETE = 'C'
    PAYMENT_STATUS_FAILED = 'F'
    PAYMENT_STATUS_CHOICES = [
        (PAYMENT_STATUS_PENDING, 'Pending'),
        (PAYMENT_STATUS_COMPLETE, 'Complete'),
        (PAYMENT_STATUS_FAILED, 'Failed')
    ]

    placed_at = models.DateTimeField(auto_now_add=True)
    payment_status = models.CharField(
        max_length=1, choices=PAYMENT_STATUS_CHOICES, default=PAYMENT_STATUS_PENDING)
    customer = models.ForeignKey(Customer, on_delete=models.PROTECT)

    class Meta:
        permissions = [
            ('cancel_order', 'Can cancel order')
        ]


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.PROTECT)
    product = models.ForeignKey(Product, on_delete=models.PROTECT, related_name='orderitems')
    license_code = models.CharField(max_length=255, null=True, blank=True) 
    price = models.IntegerField()
	

class Cart(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4)
    created_at = models.DateTimeField(auto_now_add=True)


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    
    class Meta:
        unique_together = [['cart', 'product']]


class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews')
    rate = models.PositiveIntegerField(default=5, validators=[MinValueValidator(1), MaxValueValidator(5)])
    name = models.CharField(max_length=255)
    description = models.TextField()
    date = models.DateField(auto_now_add=True)


class Chapter(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='chapters')
    title = models.CharField(max_length=255)
    lesson_total = models.IntegerField(default=0)

    def __str__(self) -> str:
        return self.title

    @property
    def lessons(self):
        queryset = self.lessons.all()
        return queryset
    
    @property
    def duration_Chapter(self):
        queryset = self.lessons.all()
        return sum([lesson.duration for lesson in queryset])

class Lesson(models.Model):
    chapter = models.ForeignKey(Chapter, on_delete=models.CASCADE, related_name='lessons')
    title = models.CharField(max_length=255)
    duration = models.IntegerField(default=0)

    def __str__(self) -> str:
        return self.title


class Teacher(models.Model):
    product = models.ManyToManyField(Product, related_name='teachers')
    name = models.CharField(max_length=255)
    title = models.CharField(max_length=255, null=True, blank=True)
    image = models.ImageField(null=True, blank=True, default="default.jpg")

    def __str__(self) -> str:
        return self.name
