from django.template import loader

# Create your views here.
from django.shortcuts import render

def home(request):
    return render(request, 'home.html')

def about(request):
    return render(request, 'about.html')

def contact(request):
    return render(request, 'contact.html')

def privacyPolicy(request):
    return render(request, 'privacyPolicy.html')


def termsOfUse(request):
    return render(request, 'termsOfUse.html')


