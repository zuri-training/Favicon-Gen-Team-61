from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Profile, Favicons, ImgFavicons, TextFavicons

# Register your models here.
admin.site.register(Profile)
admin.site.register(Favicons)
admin.site.register(ImgFavicons)
admin.site.register(TextFavicons)
