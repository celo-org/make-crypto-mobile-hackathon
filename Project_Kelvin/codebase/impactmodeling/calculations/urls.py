from django.urls import path, register_converter

from . import views


class DistributionConverter:
    regex = "[0-9],[0-9]"

    def to_python(self, value):
        numbers = value.split(",")
        return [int(numbers[0]), int(numbers[1])]

    def to_url(self, value):
        if not isinstance(value, list) or len(value) != 2 or not isinstance(value[0], int) or not isinstance(value[1], int):
            raise ValueError
        return str(value[0]) + "," + str(value[1])

register_converter(DistributionConverter, "dist")

urlpatterns = [
    path('', views.index, name='index'),
    path('update-score', views.model)

]