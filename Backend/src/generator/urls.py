from re import template
from django.urls import path

from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('profile', views.profile, name='profile'),
     path('about/', views.about, name='about'),
        path('contact/', views.contact, name='contact'),
            path('privacyPolicy/', views.privacyPolicy, name='privacyPolicy'),
                 path('termsOfUse/', views.termsOfUse, name='termsOfUse'),
                     path('faq/', views.faq, name='faq'),
                        path('login/', views.login, name='login'),
                        path('logout', views.logout, name='logout' ),
                         path('signUp/', views.signUp, name='signUp'),
                            path('forgetPassword/', views.forgetPassword, name='forgetPassword'),
                                path('documentation/', views.documentation, name='documentation'),
                                  #restricted
                                     path('homePage/', views.homePage, name='homePage'),
                                        path('drafts/', views.drafts, name='drafts'),
                                            path('settings/', views.Setting.as_view(template_name ='AccountSettings.html'), name='settings'),
                                                path('generatorByUpload/', views.generatorByUpload, name='generatorByUpload'),
                                                    path('generateByText/', views.generateByText, name='generateByText'),









]
