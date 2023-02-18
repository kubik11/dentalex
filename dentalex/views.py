from django.shortcuts import render, get_object_or_404
from .models import Banner, Service, Team, SocialLink, Gallery
from django.http import JsonResponse
import json
# Create your views here.
def lang(request):
	is_ajax = request.headers.get('X-Requested-With') == 'XMLHttpRequest'
	if is_ajax:
		if request.method == "GET":
			lang = request.GET.get('data')
			request.session['lang'] = lang
			#print(lang)
			return JsonResponse({'lang': 'languge changed!' })

def home(request):
	menu_lang = request.session.get('lang', 'UA') # set the lang default
	data_banner = Banner.objects.get()
	data_social = SocialLink.objects.get()
	data_gallery = Gallery.objects.all().filter(choused=True)
	data_service = Service.objects.order_by('id')
	data = {
		'data_banner': data_banner,
		'data_service': data_service[0 : 4],
		'data_lang': menu_lang,
		'data_social': data_social,
		'data_gallery': data_gallery[0:9]
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