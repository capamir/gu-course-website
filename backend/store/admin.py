from django.contrib import admin
from .models import Product

# Register your models here.
class ProductAdmin(admin.ModelAdmin):
    autocomplete_fields = ['collection']
    prepopulated_fields = {
        'slug': ['title']
    }
    list_display = ['title', 'unit_price', 'collection_title']
    list_editable = ['price']
    list_filter = ['collection', 'last_update']
    list_per_page = 10
    list_select_related = ['collection']
    search_fields = ['title']
    raw_id_fields = ['collection', 'promotions']

    def collection_title(self, product):
        return product.collection.title


admin.site.register(Product, ProductAdmin)