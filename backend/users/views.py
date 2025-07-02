from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.mixins import CreateModelMixin
from rest_framework.viewsets import GenericViewSet, ModelViewSet
from rest_framework_simplejwt.views import TokenObtainPairView as BaseTokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.cache import cache_page
from django.utils.decorators import method_decorator
from asgiref.sync import async_to_sync

from core.celery import app as celery_app
from core.chatbot_agent import invoke_chatbot_agent
from .models import User, OtpCode, Message
from .serializers import UserRegisterSerializer, TokenObtainPairSerializer, OTPVerificationSerializer, MessageSerializer
from .tasks import generate_ai_response


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
        # If a non-staff user sends a message, trigger AI response
        if not self.request.user.is_staff:
            generate_ai_response.delay(message.id) # Trigger the AI task
        # No explicit action needed if admin sends a message,
        # as MessageSerializer's create method already handles is_admin_response=True for staff.

@celery_app.task
def process_user_message_with_ai(user_message_id):
    try:
        user_message = Message.objects.get(id=user_message_id)
        user_id = user_message.user.id
        user_input_content = user_message.content

        # Synchronously call the async chatbot agent
        ai_response_content = async_to_sync(invoke_chatbot_agent)(user_input_content, user_id)

        # Save AI's response
        Message.objects.create(
            user=user_message.user,
            content=ai_response_content,
            is_admin_response=True, # Mark as AI response
            parent=user_message # Link to the user's message
        )
        print(f"AI response saved for user {user_message.user.full_name}: {ai_response_content}")

    except Exception as e:
        print(f"Error processing message with AI: {e}")
        # Log the error, perhaps notify an admin


class SendMessageView(APIView):
    def post(self, request, *args, **kwargs):
        user = request.user # Assuming user is authenticated
        if not user.is_authenticated:
            return Response({"detail": "Authentication required"}, status=status.HTTP_401_UNAUTHORIZED)

        content = request.data.get('content')
        if not content:
            return Response({"detail": "Message content is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Save the user's message
        user_message = Message.objects.create(
            user=user,
            content=content,
            is_admin_response=False
        )

        # Trigger Celery task to get AI response
        process_user_message_with_ai.delay(user_message.id)

        return Response({"detail": "Message sent, AI response pending."}, status=status.HTTP_202_ACCEPTED)
