from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.mixins import CreateModelMixin
from rest_framework.viewsets import GenericViewSet, ModelViewSet
from rest_framework_simplejwt.views import TokenObtainPairView as BaseTokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.cache import cache_page
from django.utils.decorators import method_decorator

from .models import User, OtpCode, Message
from .serializers import UserRegisterSerializer, TokenObtainPairSerializer, OTPVerificationSerializer, MessageSerializer


# Create your views here.
class UserRegister(CreateModelMixin, GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer

class TokenObtainPairView(BaseTokenObtainPairView):
    serializer_class = TokenObtainPairSerializer


class OTPVerificationViewSet(CreateModelMixin, GenericViewSet):
    queryset = OtpCode.objects.all()
    serializer_class = OTPVerificationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            phone_number = serializer.validated_data.get('phone')
            otp_code = int(serializer.validated_data.get('code'))
            
            # Retrieve the OTP code associated with the provided phone number
            try:
                otp_obj = OtpCode.objects.get(phone_number=phone_number)
                saved_otp_code = otp_obj.code
            except OtpCode.DoesNotExist:
                return Response({'message': 'OTP code not found for the provided phone number'}, status=status.HTTP_404_NOT_FOUND)
            
            # Compare the OTP codes
            if otp_code == saved_otp_code:
                # OTP code is correct, perform necessary actions (e.g., activate the user)
                # For example, you might want to activate the user if OTP is correct
                user = User.objects.get(phone_number=phone_number)
                user.is_active = True
                user.save()
                
                # You can also delete the OTP code from the database after successful verification
                otp_obj.delete()
                
                return Response({'message': 'OTP code verified successfully'}, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'Invalid OTP code'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MessageViewSet(ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Admins see all messages; users see their own and admin replies
        if self.request.user.is_staff:
            return Message.objects.all()
        return Message.objects.filter(user=self.request.user) | Message.objects.filter(parent__user=self.request.user)

    def get_serializer_context(self):
        return {'request': self.request}

    @method_decorator(cache_page(60 * 15))  # Cache message list for 15 minutes
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    def perform_create(self, serializer):
        message = serializer.save()
        # Notify admins if a non-admin user sends a message
        if not self.request.user.is_staff:
            notify_admin.delay(message.id)