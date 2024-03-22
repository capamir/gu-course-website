from random import randint
from django.conf import settings
from django.db.models.signals import post_save
from .models import OtpCode, User

def createOtpCode(sender, instance: User, created, **kwargs):
  if created:
    random_code = randint(1000, 9999)
    # send_otp_code
    OtpCode.objects.create(phone_number=instance.phone_number, code=random_code)

post_save.connect(createOtpCode, sender=settings.AUTH_USER_MODEL)