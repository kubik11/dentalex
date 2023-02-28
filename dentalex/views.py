from django.shortcuts import render, get_object_or_404
from .models import Banner, Service, Team, SocialLink, Gallery, Review
from django.http import JsonResponse
from django.core import serializers
from django.core.mail import send_mail
from django.conf import settings
import json
# Create your views here.
def mail(request):
	is_ajax = request.headers.get('X-Requested-With') == 'XMLHttpRequest'
	if is_ajax:
		if request.method == 'POST':
			data = json.load(request)
			phone_number = data.get('phone_number')
			send_mail('Обратный звонок', str(phone_number), settings.DEFAULT_FROM_EMAIL, [settings.DEFAULT_TO_EMAIL], fail_silently=False)
			return JsonResponse({'message': 'message changed!' })
def lang(request):
	is_ajax = request.headers.get('X-Requested-With') == 'XMLHttpRequest'
	if is_ajax:
		if request.method == "GET":
			lang = request.GET.get('data')
			request.session['lang'] = lang
			#print(lang)
			return JsonResponse({'lang': 'languge changed!' })

def home(request):
	if request.method == 'POST':
		is_ajax = request.headers.get('X-Requested-With') == 'XMLHttpRequest'
		if is_ajax:
			data = json.load(request)
			review_name = data.get('name')
			review_body = data.get('body')
			Review.objects.create(name=review_name, body=review_body)
			_update = Review.objects.order_by('-created').filter(active=True)#values('name', 'body')
			data_update = serializers.serialize("json", _update[0 : 1], fields=('name', 'body', 'created'))
			return JsonResponse(data_update, safe=False) # safe=False if you need serialize without pair

	menu_lang = request.session.get('lang', 'UA') # set the lang default
	data_banner = Banner.objects.get()
	data_social = SocialLink.objects.get()
	data_gallery = Gallery.objects.all().filter(choused=True)
	data_service = Service.objects.order_by('id')
	data_reviews = Review.objects.order_by('-created').filter(active=True)
	data = {
		'data_banner': data_banner,
		'data_service': data_service[0 : 4],
		'data_lang': menu_lang,
		'data_social': data_social,
		'data_gallery': data_gallery[0:9],
		'data_reviews': data_reviews[0:15]
	}
	return render( request, 'pages/home.html', data)

def services(request):
	menu_lang = request.session.get('lang', 'UA')
	data_service = Service.objects.order_by('id')
	data_social = SocialLink.objects.get()
	data_gallery = Gallery.objects.all()
	data = {
		'data_service': data_service ,
		'data_lang': menu_lang,
		'data_social': data_social,
		'data_gallery': data_gallery
	}
	return render( request, 'pages/services.html', data )

def service_info(request, id):
	menu_lang = request.session.get('lang', 'UA')
	data_info = get_object_or_404(Service, pk = id)
	data_social = SocialLink.objects.get()
	data_gallery = Gallery.objects.all()
	data = {
		'data_info' : data_info,
		'data_lang': menu_lang,
		'data_social': data_social,
		'data_gallery': data_gallery
	}
	return render( request, 'pages/service_info.html', data )

def team(request):
	menu_lang = request.session.get('lang', 'UA')
	data_team = Team.objects.all()
	data_social = SocialLink.objects.get()
	data_gallery = Gallery.objects.all()
	data = {
		'data_team': data_team,
		'data_lang': menu_lang,
		'data_social': data_social,
		'data_gallery': data_gallery
	}
	return render( request, 'pages/team.html', data)