from django.contrib import admin
from .models import Profile, Favicons, ImgFavicons, TextFavicons

admin.site.register(Profile)
admin.site.register(ImgFavicons)
admin.site.register(TextFavicons)
admin.site.register(Favicons)
