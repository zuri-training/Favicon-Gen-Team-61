from django.urls import path, include
from django.contrib.auth import views as auth_views
from . import views

app_name = 'generator'

urlpatterns = [
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('register', views.SignUp, name='register'),
    path('login', views.SignIn, name='login'),
    path('setting', views.AccountSetting.as_view(template_name ='AccountSettings.html'), name='setting'), 
    path('delete', views.DeleteAccount, name='delete-account'),
    path('contact/', views.contact, name='contact'),
    path('privacyPolicy/', views.privacyPolicy, name='privacyPolicy'),
    path('termsOfUse/', views.termsOfUse, name='termsOfUse'),
    
   
]
