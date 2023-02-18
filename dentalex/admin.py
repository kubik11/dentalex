from django.contrib import admin
from .models import Banner, Service, Team, SocialLink, Gallery
from django.utils.html import format_html
# Register your models here.
class BannerAdmin(admin.ModelAdmin):
	def thambnail(self, object):
		return format_html('<img src="{}" height="40" width="40" style="border-radius: 50px;"/>'.format(object.banner_photo_1.url))

	thambnail.short_description = "Photo"
	list_display = ('id', 'banner_ad', 'thambnail','banner_photo_2','banner_photo_3', 'banner_photo_4')
	list_display_links = ('id', 'banner_ad', 'thambnail','banner_photo_2','banner_photo_3', 'banner_photo_4')

class ServiceAdmin(admin.ModelAdmin):
	def thambnail(self, object):
		return format_html( f'<img src="{object.service_photo.url}" width="40" height="40" style="border-radius: 50px;"/>')

	thambnail.short_description = "Service photo"
	list_display = ('id', 'thambnail', 'service_photo')
	list_display_links = ('id', 'thambnail', 'service_photo')

class TeamAdmin(admin.ModelAdmin):
	def thambnail(self, object):
		return format_html( f'<img src="{ object.team_photo.url }" width="40" height="40" style="border-radius: 50px;"/>')
	thambnail.short_description = 'Team photo'
	list_display = ('id', 'thambnail', 'team_name', 'team_position')
	list_display_links = ('id', 'thambnail', 'team_name', 'team_position')

class SocialLinkAdmin(admin.ModelAdmin):
	list_display = ('id','phone', 'schedule')
	list_display_links = ('id', 'phone', 'schedule')

class GalleryAdmin(admin.ModelAdmin):
	def thambnail(self, object):
		return format_html( f'<img src="{ object.photo.url }" width="40" height="40" style="border-radius: 50px;"/>')
	thambnail.short_description = "Gallery photo"
	list_display = ('id','thambnail', 'choused')
	list_display_links = ('id', 'thambnail', 'choused')	

admin.site.register( Banner, BannerAdmin )
admin.site.register( Service, ServiceAdmin )
admin.site.register( Team, TeamAdmin )
admin.site.register( SocialLink, SocialLinkAdmin)
admin.site.register( Gallery, GalleryAdmin)

