from django.urls import path
from . import views



app_name="core"
urlpatterns=[
	path("", views.home, name="home"),
    path("analyze_comment/", views.analyze_comment, name="analyze_comment"),
]