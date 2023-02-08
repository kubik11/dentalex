from django.shortcuts import render

# Create your views here.
def home(request):
	return render( request, 'pages/home.html')

def services(request):
	return render( request, 'pages/services.html')