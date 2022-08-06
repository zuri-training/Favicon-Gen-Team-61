from django.urls import path
from django.views.generic import TemplateView


app_name = 'images'

urlpatterns = [
    path('', TemplateView.as_view(template_name="images/index.html")),
]