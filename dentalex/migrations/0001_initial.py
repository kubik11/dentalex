# Generated by Django 4.1.6 on 2023-02-08 13:13

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Banner',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('banner_ad', models.CharField(max_length=255)),
                ('banner_photo_1', models.ImageField(upload_to='photos')),
                ('banner_photo_2', models.ImageField(upload_to='photos')),
                ('banner_photo_3', models.ImageField(upload_to='photos')),
                ('banner_photo_4', models.ImageField(blank=True, upload_to='photos')),
            ],
        ),
    ]
