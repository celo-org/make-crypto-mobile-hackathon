from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('calculations/', include('calculations.urls')),
    path('admin/', admin.site.urls),
]