from django.urls import path

from . import views

urlpatterns = [
    path('', views.home, name='home'),
     path('about/', views.about, name='about'),
        path('contact/', views.contact, name='contact'),
            path('privacyPolicy/', views.privacyPolicy, name='privacyPolicy'),
                 path('termsOfUse/', views.termsOfUse, name='termsOfUse'),
                     path('faq/', views.faq, name='faq'),
                        path('login/', views.login, name='login'),
                         path('signUp/', views.signUp, name='signUp'),
                            path('forgetPassword/', views.forgetPassword, name='forgetPassword'),







]
