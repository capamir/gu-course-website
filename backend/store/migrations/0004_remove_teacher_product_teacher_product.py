# Generated by Django 5.0.3 on 2024-04-02 08:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0003_review_rate_teacher'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='teacher',
            name='product',
        ),
        migrations.AddField(
            model_name='teacher',
            name='product',
            field=models.ManyToManyField(related_name='teachers', to='store.product'),
        ),
    ]
