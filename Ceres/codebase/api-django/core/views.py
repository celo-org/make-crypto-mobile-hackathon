from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .serializers import (InterestSerializer, GenderSerializer)
from .models import (Gender, Interest, Address, SystemConfig, APP)

# Create your views here.


class ListGenderView(generics.ListAPIView):
    serializer_class = GenderSerializer

    def get_queryset(self):
        queryset = Gender.objects.all()
        return queryset


class ListInterestView(generics.ListAPIView):
    serializer_class = InterestSerializer

    def get_queryset(self):
        queryset = Interest.objects.all()
        return queryset


class GetCurrentAppVersion(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):
        data = self.get_serializer_context()
        return Response(data, status=status.HTTP_200_OK)

    def get_serializer_context(self):
        query = SystemConfig.objects.filter(platform=APP)
        context = {}
        if query:
            obj = query.latest('released_at')
            context['version'] = obj.version
            context['released_at'] = obj.released_at
        return context