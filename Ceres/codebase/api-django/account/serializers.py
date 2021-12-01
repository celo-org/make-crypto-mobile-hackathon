from rest_framework import serializers
from .models import (User)

class RegisterUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        exclude = ['created', 'updated']


class AuthenticateUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['name', 'email']