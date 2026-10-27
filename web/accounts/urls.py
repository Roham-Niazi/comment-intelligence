from django.urls import path
from . import views



app_name="accounts"
urlpatterns=[
	path("login", views.login_view, name="login"),
	path("signup", views.signup_view, name="signup"),
	path("logout", views.logout_view, name="logout"),
    
	path("dashboard", views.dashboard, name="dashboard"),
	path("documentation", views.documentation, name="documentation"),
	path("change_password", views.change_password, name="change_password"),
]