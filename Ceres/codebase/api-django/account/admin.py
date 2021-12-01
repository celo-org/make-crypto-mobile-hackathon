from django.contrib import admin
from .models import (User, Preference)

# Register your models here.


class UserAdmin(admin.ModelAdmin):
    search_fields = ['email', 'firebase_uid', 'name']
    list_display = ['name', 'email', 'points', 'is_confirmed', 'phone_confirmed']
    list_filter = ['created']

admin.site.register(User, UserAdmin)
admin.site.register(Preference)
