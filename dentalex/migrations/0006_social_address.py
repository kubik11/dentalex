# Generated by Django 4.1.6 on 2023-02-13 11:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dentalex', '0005_social'),
    ]

    operations = [
        migrations.AddField(
            model_name='social',
            name='address',
            field=models.CharField(blank=True, max_length=150),
        ),
    ]
