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


def documentation(request):
    return render(request, 'documentation.html')
#  auth Pages


def login(request):
    return render(request, 'login.html')

def signUp(request):
     return render(request, 'signUp.html')    

def forgetPassword(request):
    return render(request, 'forgetPassword.html')


#  Restricted Pages


def homePage(request):
     return render(request, 'homePage.html')  


def drafts(request):
     return render(request, 'drafts.html')  


def settings(request):
     return render(request, 'settings.html')  


def generatorByUpload(request):
    return render(request, 'generatorByUpload.html')


def generateByText(request):
    return render(request, 'generateByText.html')



