from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

admin.site.site_header = 'Storefront Admin'

urlpatterns = [
    path('admin/', admin.site.urls),
    path('store/', include('store.urls')),
    path('auth/', include('users.urls')),
    path('', TemplateView.as_view(template_name='index.html')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
