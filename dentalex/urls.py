from django.urls import path
from . import views
urlpatterns = [
	path('', views.home, name='home'),
	path('services', views.services, name='services'),
	path('services/<int:id>', views.service_info, name='service_info'),
	path('team', views.team, name='team'), 
	path('lang', views.lang, name='lang'),
	path('services/lang', views.lang, name='lang'),
	path('mail', views.mail, name='mail')
]