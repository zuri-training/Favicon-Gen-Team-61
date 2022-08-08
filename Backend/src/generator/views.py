from django.template import loader

#template views 
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


def faq(request):
    return render(request, 'faq.html')

def login(request):
    return render(request, 'login.html')

def signUp(request):
     return render(request, 'signUp.html')    

def forgetPassword(request):
    return render(request, 'forgetPassword.html')

