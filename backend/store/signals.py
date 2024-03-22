from django.conf import settings
from django.db.models.signals import post_save
from .models import Customer

def createCustomer(sender, **kwargs):
  if kwargs['created']:
    Customer.objects.create(user=kwargs['instance'])

post_save.connect(createCustomer, sender=settings.AUTH_USER_MODEL)