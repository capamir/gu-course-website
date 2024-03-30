from django.contrib import admin
from django.db.models.aggregates import Count
from django.urls import reverse
from django.utils.html import format_html, urlencode

from .models import Product, Customer, Order, OrderItem, Chapter, Lesson

# Register your models here.
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


class ChapterAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'lesson_total']
    search_fields = ['title']


class LessonAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'duration']
    raw_id_fields= ['chapter']
    search_fields = ['title']


admin.site.register(Product, ProductAdmin)

admin.site.register(Customer, CustomerAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(OrderItem, OrderItemAdmin)
admin.site.register(Chapter, ChapterAdmin)
admin.site.register(Lesson, LessonAdmin)
