# Generated by Django 4.1.6 on 2023-02-13 21:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dentalex', '0009_gallery'),
    ]

    operations = [
        migrations.AddField(
            model_name='gallery',
            name='choused',
            field=models.BooleanField(default=True),
        ),
    ]
