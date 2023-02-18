from django.db import models
from ckeditor.fields import RichTextField

# Create your models here.
class Banner(models.Model):
	
	banner_ad = models.CharField(max_length = 255)
	banner_photo_1 = models.ImageField(upload_to = 'photos')
	banner_photo_2 = models.ImageField(upload_to = 'photos')
	banner_photo_3 = models.ImageField(upload_to = 'photos')
	banner_photo_4 = models.ImageField(upload_to = 'photos', blank = True)

class Service(models.Model):
	service_title = models.CharField(max_length = 255)
	service_photo = models.ImageField(upload_to = 'photos')
	service_photo_1 = models.ImageField(upload_to = 'photos', blank = True)
	service_photo_2 = models.ImageField(upload_to = 'photos', blank = True)
	service_prise_from = models.IntegerField()
	service_prise_to = models.IntegerField()
	service_description = RichTextField()

class Team(models.Model):
	team_name = models.CharField(max_length = 50)
	team_position = models.CharField(max_length = 30)
	team_photo = models.ImageField(upload_to = 'photos')

class SocialLink(models.Model):
	facebook_link = models.URLField(max_length = 100, blank = True)
	telegram_link = models.URLField(max_length = 100, blank = True)
	instagram_link = models.URLField(max_length = 100, blank = True)
	address = models.CharField(max_length = 150)
	schedule = models.CharField(max_length = 50)
	phone = models.CharField(max_length = 15)
	phone_2 = models.CharField(max_length = 15, blank = True)
	phone_3 = models.CharField(max_length = 15, blank = True)
	phone_4 = models.CharField(max_length = 15, blank = True)

class Gallery(models.Model):
	photo = models.ImageField(upload_to = 'photos')
	choused = models.BooleanField(default = True)
		