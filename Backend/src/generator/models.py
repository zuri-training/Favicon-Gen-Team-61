from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your models here.

class ImgFavicons(models.Model):
    icon_title = models.CharField(max_length=500)
    icon = models.FileField()
  
class TextFavicons(models.Model):
    icon_title = models.CharField(max_length=500)
    icon = models.TextField()


class Favicons(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    img_generated_icons = models.ManyToManyField(ImgFavicons)
    txt_generated_icons = models.ManyToManyField(TextFavicons)


class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    generated_icons = models.ManyToManyField(Favicons)
    

