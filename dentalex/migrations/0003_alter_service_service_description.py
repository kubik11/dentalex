# Generated by Django 4.1.6 on 2023-02-11 12:20

import ckeditor.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('dentalex', '0002_service'),
    ]

    operations = [
        migrations.AlterField(
            model_name='service',
            name='service_description',
            field=ckeditor.fields.RichTextField(),
        ),
    ]
