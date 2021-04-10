from django.contrib.auth import authenticate
from django.db import transaction
from django.http import HttpResponse, Http404
from rest_framework import authentication, permissions, generics
from rest_framework_jwt.settings import api_settings
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
from rest_framework import status, viewsets, filters
from rest_framework.views import APIView
from .serializer import AccountSerializer
from .models import Account, AccountManager

import json

class addInformation(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
#    permission_classes = (permissions.IsAuthenticated,)

    @transaction.atomic
    def post(self, request, format=None):
        serializer = AccountSerializer(data=json.loads(request.data))
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AuthInfoGetView(generics.RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

    def get(self, request, format=None):

        return Response(data={
            'username': request.user.username,
            'email': request.user.email,
            'profile': request.user.profile,
            },
            status=status.HTTP_200_OK)


class AuthInfoUpdateView(generics.UpdateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = AccountSerializer
    queryset = Account.objects.all()

    def get_object(self):
        try:
            instance = self.queryset.get(pk=self.request.user.uuid)
            return instance
        except Account.DoesNotExist:
            raise Http404


class AuthInfoDeleteView(generics.DestroyAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = AccountSerializer
    queryset = Account.objects.all()

    def get_object(self):
        try:
            instance = self.queryset.get(pk=self.request.user.uuid)
            return instance
        except Account.DoesNotExist:
            raise Http404