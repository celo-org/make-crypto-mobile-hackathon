from django.contrib import admin
from .models import (Address, Currency, Interest, Gender, Country, SystemConfig)


class SystemConfigAdmin(admin.ModelAdmin):
    list_display = ['platform', 'version', 'released_at']


admin.site.register(Address)
admin.site.register(Currency)
admin.site.register(Interest)
admin.site.register(Gender)
admin.site.register(Country)
admin.site.register(SystemConfig, SystemConfigAdmin)
