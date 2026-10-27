from django.contrib import admin
from .models import User

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
	list_display = ("phone", "api_key", "is_active", "is_staff")
	search_fields = ("phone",)