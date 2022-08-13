from django.contrib import admin
from .models import Profile, Favicons, ImgFavicons, TextFavicons, upload

admin.site.register(Profile)
admin.site.register(upload)
admin.site.register(TextFavicons)
admin.site.register(Favicons)
