from django.conf import settings
from django.db.models.signals import post_save, post_delete
from .models import Customer, Chapter, Lesson, Product, Details

def createCustomer(sender, **kwargs):
  if kwargs['created']:
    Customer.objects.create(user=kwargs['instance'])

def update_lesson_total_on_lesson_save(sender, instance, created, **kwargs):
    if created:
        instance.chapter.lesson_total += 1
        instance.chapter.save()

def update_lesson_total_on_lesson_delete(sender, instance, **kwargs):
    instance.chapter.lesson_total -= 1
    instance.chapter.save()

def create_details_on_product_save(sender, instance, created, **kwargs):
    if created:
        Details.objects.create(product=instance)


post_save.connect(createCustomer, sender=settings.AUTH_USER_MODEL)
post_save.connect(update_lesson_total_on_lesson_save, sender=Lesson)
post_delete.connect(update_lesson_total_on_lesson_delete, sender=Lesson)
post_save.connect(create_details_on_product_save, sender=Product)
