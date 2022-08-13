from re import template
from django.urls import path

from . import views
from django.contrib.auth import views as auth_views




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
                                     path('homePage/', views.homePage, name='homePage'),
                                            path('settings/', views.Setting.as_view(template_name ='AccountSettings.html'), name='settings'),
                                                path('generatorByUpload/', views.generatorByUpload, name='generatorByUpload'),
                                                    path('generateByText/', views.generateByText, name='generateByText'),



    path('reset_password/',
     auth_views.PasswordResetView.as_view(template_name='password_reset.html'),
     name="reset_password"),

    path('reset_password_sent/', 
        auth_views.PasswordResetDoneView.as_view(), 
        name="password_reset_done"),

    path('reset/<uidb64>/<token>/',
     auth_views.PasswordResetConfirmView.as_view(), 
     name="password_reset_confirm"),

    path('reset_password_complete/', 
        auth_views.PasswordResetCompleteView.as_view(), 
        name="password_reset_complete"),







]
