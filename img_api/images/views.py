from django.shortcuts import render

# Create your views here.
from django.views.generic import ListView
from .models import Images


class ImagesListView(ListView):
    model = Images
    template_name = 'images/all_images.html'