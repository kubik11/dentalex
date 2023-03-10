# Generated by Django 4.1.6 on 2023-02-13 12:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dentalex', '0007_social_schedule'),
    ]

    operations = [
        migrations.CreateModel(
            name='SocialLink',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('facebook_link', models.URLField(blank=True, max_length=100)),
                ('telegram_link', models.URLField(blank=True, max_length=100)),
                ('instagram_link', models.URLField(blank=True, max_length=100)),
                ('address', models.CharField(max_length=150)),
                ('schedule', models.CharField(max_length=50)),
                ('phone', models.CharField(max_length=15)),
                ('phone_2', models.CharField(blank=True, max_length=15)),
                ('phone_3', models.CharField(blank=True, max_length=15)),
                ('phone_4', models.CharField(blank=True, max_length=15)),
            ],
        ),
        migrations.DeleteModel(
            name='Social',
        ),
    ]
