from rest_framework import serializers
from .models import (Address, Gender, Interest)


class AddressSerializer(serializers.ModelSerializer):

    class Meta:
        model = Address
        exclude = ['created', 'updated']


class GenderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gender
        exclude = ['created', 'updated']


class InterestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interest
        exclude = ['created', 'updated']
