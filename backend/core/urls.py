from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

admin.site.site_header = 'Storefront Admin'

urlpatterns = [
    path('admin/', admin.site.urls),
    path('store/', include('store.urls')),
    path('auth/', include('users.urls')),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
