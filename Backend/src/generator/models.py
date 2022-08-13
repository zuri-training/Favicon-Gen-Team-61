from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your models here.

# Create your models here. img
class upload(models.Model): #img
    title=models.CharField(max_length=50) #img
    upload=models.FileField(upload_to="media")#img


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
    id_user = models.IntegerField()
    generated_icons = models.ManyToManyField(Favicons, blank=True)
    
    def __str__(self):
        return self.user.username
