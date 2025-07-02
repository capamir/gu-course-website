from random import randint
from django.conf import settings
from django.db.models.signals import post_save
from django.core.mail import send_mail # Added
from django.core.cache import cache   # Added
from .models import OtpCode, User, Message

def createOtpCode(sender, instance: User, created, **kwargs):
    if created:
        random_code = randint(1000, 9999)
        # send_otp_code
        OtpCode.objects.create(phone_number=instance.phone_number, code=random_code)

def notify_admin_on_message(sender, instance, created, **kwargs):
    if created and not instance.user.is_staff:  # Only notify for new user messages
        admins = User.objects.filter(is_staff=True)
        subject = f"New Message from {instance.user.username}"
        message_text = f"User {instance.user.username} sent: {instance.content}"
        admin_emails = [admin.email for admin in admins if admin.email]
        if admin_emails:
            send_mail(
                subject,
                message_text,
                'from@example.com',
                admin_emails,
                fail_silently=False,
            )
        # Clear cache for user's messages
        cache_key = f"views.decorators.cache.cache_page..{f'/api/messages/'}"
        cache.delete(cache_key)

post_save.connect(createOtpCode, sender=settings.AUTH_USER_MODEL)
post_save.connect(notify_admin_on_message, sender=Message)