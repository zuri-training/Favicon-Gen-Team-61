from re import template
from django.urls import path,include
from . import views
from django.contrib.auth import views as auth_views
from django.conf import settings
from django.contrib import admin

from django.conf.urls.static import static


urlpatterns = [
    path('', views.home, name='home'),
    path('profile', views.profile, name='profile'),
    path('delete', views.DeleteAccount, name='delete-account'),
     path('about/', views.about, name='about'),
        path('contact/', views.contact, name='contact'),
            path('privacyPolicy/', views.privacyPolicy, name='privacyPolicy'),
                 path('termsOfUse/', views.termsOfUse, name='termsOfUse'),
                     path('faq/', views.faq, name='faq'),
                        path('login/', views.login, name='login'),
                        path('logout', views.logout, name='logout' ),
                         path('signUp/', views.signUp, name='signUp'),
                                path('documentation/', views.documentation, name='documentation'),
                                  #restricted
                                  path('generate/', views.generate, name='generate'),
                                     path('homePage/', views.homePage, name='homePage'),
                                            path('settings/', views.Setting.as_view(template_name ='AccountSettings.html'), name='settings'),
                                                path('generatorByUpload/', views.generatorByUpload, name='generatorByUpload'),
                                                    path("generatorByUpload1",views.generatorByUpload1,name="generatorByUpload1"), #img
                                                        path('generateByText/', views.generateByText, name='generateByText'),



    path('reset_password/',
     auth_views.PasswordResetView.as_view(template_name='password_reset.html'),
     name="reset_password"),

    path('reset_password_sent/', 
        auth_views.PasswordResetDoneView.as_view(template_name='password_reset_sent.html'), 
        name="password_reset_done"),

    path('reset/<uidb64>/<token>/',
     auth_views.PasswordResetConfirmView.as_view(template_name='password_reset_form.html'), 
     name="password_reset_confirm"),

    path('reset_password_complete/', 
        auth_views.PasswordResetCompleteView.as_view(template_name='password_reset_done.html'), 
        name="password_reset_complete"),







]
urlpatterns+=static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)