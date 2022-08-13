from django.template import loader
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages, auth
from django.contrib.auth.models import User 
from .models import Profile, Favicons, upload
from .forms import UpdatePassword, EditProfileForm, UploadIcon
from django.views.generic import UpdateView
from django.urls import reverse_lazy
from django.contrib.auth.views import PasswordChangeView
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from favicons import Favicons


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
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']

        user = auth.authenticate(username=username, password=password)
        
        if user is not None:     
            auth.login(request, user)
            return redirect('homePage')
        else:
            messages.info(request, "Invalid Login Details")
            return redirect('login')
    return render(request, 'login.html')

def logout(request):
    auth.logout(request)
    return redirect('login')


def signUp(request):
    if request.method == 'POST':
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password']
        password2 = request.POST['password2']

        if password == password2:
            if User.objects.filter(email=email).exists():
                messages.info(request, "Email Already Exist")
                return redirect('signUp')
            elif User.objects.filter(username=username).exists():
                messages.info(request, "Username Already Exist")
                return redirect('signUp')
            else:
                user = User.objects.create_user(username=username, email=email, password=password)
                user.save()
                
                # Log User in and redirect to setting page
                user_login = auth.authenticate(username=username, password=password)
                auth.login(request, user_login)

                # Create the profile page for the new user
                user_model = User.objects.get(username=username)
                new_profile = Profile.objects.create(user=user_model, id_user=user_model.id)
                
                return redirect('homePage')    
        else:
            messages.info(request, "Password didn't match")
            return redirect('signUp')

    return render(request, 'signUp.html')    





#  Restricted Pages

@login_required(login_url='login')
def homePage(request):
     return render(request, 'homePage.html')  

@login_required(login_url='login')
def profile(request):
    
    return render(request, 'draft_list.html')




class Setting(LoginRequiredMixin, PasswordChangeView):
    login_url = 'login'
    form_class = UpdatePassword
    success_url = reverse_lazy('homePage') 



@login_required(login_url='login')
def generatorByUpload(request):
    if request.method == 'POST':
        title=  request.user.username      
        upload1=    request.FILES.get('upload')
        object  =     upload.objects.create(title=title, upload=upload1)        
        object.save() 
         
         
         # Generate the icons
        YOUR_ICON = ""
        WEB_SERVER_ROOT = "http://localhost:8000/generatorByUpload"
        with Favicons(YOUR_ICON, WEB_SERVER_ROOT) as favicons:
            favicons.generate()
            for icon in favicons.filenames():
                print(icon) 
           
                
        return redirect('generatorByUpload')
    return render(request, 'generatorByUpload.html')

def generate(request):
    image = upload.objects.get(upload=request.user.username)
     


def generatorByUpload1(request):
  
    return render(request,'generatorByUpload1.html')


@login_required(login_url='login')
def generateByText(request):
    
    return render(request, 'generateByText.html')



@login_required(login_url='login')
def DeleteAccount(request):
    # user_model = get_object_or_404(User, id=id)
    user = User.objects.filter(username=request.user.username)
    if user.exists():
        user.delete()
        return redirect('login')
 