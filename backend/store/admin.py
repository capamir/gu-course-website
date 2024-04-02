from django.contrib import admin
from django.db.models.aggregates import Count
from django.urls import reverse
from django.utils.html import format_html, urlencode

from .models import Product, Customer, Order, OrderItem, Chapter, Lesson, Review, Teacher, Details

# Register your models here.
class ChapterInline(admin.TabularInline):
    model = Chapter
    raw_id_fields= ['product']

class DetailsInline(admin.TabularInline):
    model = Details
    raw_id_fields= ['product']

class ProductAdmin(admin.ModelAdmin):
    prepopulated_fields = {
        'slug': ['title']
    }
    list_display = ['title', 'price']
    list_editable = ['price']
    list_filter = ['updated']
    list_per_page = 10
    search_fields = ['title']
    raw_id_fields = ['promotions']
    readonly_fields = ['thumbnail']
    inlines = (ChapterInline, DetailsInline,)

    def thumbnail(self, instance):
        if instance.image.name != '':
            return format_html(f'<img src="{instance.image.url}" class="thumbnail" />')
        return ''


class CustomerAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'membership', 'orders']
    list_editable = ['membership']
    list_per_page = 10
    list_select_related = ['user']
    ordering = ['user__full_name']
    search_fields = ['full_name__istartswith', 'last_name__istartswith']
    
    @admin.display(ordering='orders_count')
    def orders(self, customer):
        url = (
            reverse('admin:store_order_changelist')
            + '?'
            + urlencode({
                'customer__id': str(customer.id)
            }))
        return format_html('<a href="{}">{} Orders</a>', url, customer.orders_count)

    def get_queryset(self, request):
        return super().get_queryset(request).annotate(
            orders_count=Count('order')
        )


class OrderItemInline(admin.TabularInline):
    autocomplete_fields = ['product']
    min_num = 1
    max_num = 10
    model = OrderItem
    extra = 0


class OrderAdmin(admin.ModelAdmin):
    autocomplete_fields = ['customer']
    inlines = [OrderItemInline]
    list_display = ['id', 'placed_at', 'customer']
    raw_id_fields = ['customer',]


class OrderItemAdmin(admin.ModelAdmin):
    list_display = ['id', 'order', 'product']
    raw_id_fields= ['order', 'product']

class LessonInline(admin.TabularInline):
    model = Lesson
    raw_id_fields= ['chapter']

class ChapterAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'lesson_total']
    raw_id_fields = ["product"]
    search_fields = ['title']
    inlines = (LessonInline,)
    readonly_fields = ['lesson_total','duration_Chapter',]


class LessonAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'duration']
    raw_id_fields= ['chapter']
    search_fields = ['title']


class ReviewAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'rate', 'date']
    raw_id_fields= ['product']
    search_fields = ['name']
    list_filter = ["rate", 'date']


class TeacherAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']
    raw_id_fields= ['product']
    search_fields = ['name']
    readonly_fields = ['thumbnail']

    def thumbnail(self, instance):
        if instance.image.name != '':
            return format_html(f'<img src="{instance.image.url}" class="thumbnail" />')
        return ''


class DetailsAdmin(admin.ModelAdmin):
    list_display = ['product', 'status', 'duration', 'support']
    raw_id_fields= ['product']
    list_filter = ['status',]
    readonly_fields = ['duration']


admin.site.register(Product, ProductAdmin)
admin.site.register(Review, ReviewAdmin)
admin.site.register(Customer, CustomerAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(OrderItem, OrderItemAdmin)
admin.site.register(Chapter, ChapterAdmin)
admin.site.register(Lesson, LessonAdmin)
admin.site.register(Teacher, TeacherAdmin)
admin.site.register(Details, DetailsAdmin)
