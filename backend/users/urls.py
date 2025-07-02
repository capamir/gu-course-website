from django.urls import path
from rest_framework import routers
from rest_framework_simplejwt.views import TokenRefreshView

from . import views

router = routers.SimpleRouter()
router.register('register', views.UserRegister)
router.register('verify', views.OTPVerificationViewSet, basename='optcode')
router.register('messages', views.MessageViewSet, basename='messages')

urlpatterns = [
    path('login/', views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('send-message/', views.SendMessageView.as_view(), name='send_message'),
]

urlpatterns += router.urls