from django.contrib.auth import authenticate
from django.db import transaction, connection
from django.http import HttpResponse, Http404
from rest_framework import authentication, permissions, generics
from rest_framework_jwt.settings import api_settings
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
from rest_framework import status, viewsets, filters
from rest_framework.views import APIView
from .repositorys import InfoRepositorys

import json

class GetOneInfo(generics.RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    repository = InfoRepositorys()

    def post(self, request, format=None):
        data=request.data
        try:
            if 'info_id' not in data:
                raise Exception('info_id is not included in request')
            if data["info_id"].isdecimal() == False:
                raise Exception('info_id is not integer')

            rowData = self.repository.getInfo(data["info_id"], request.user.username)

            if len(rowData) == 0:
                raise Exception('this info_id is not found in infos table')

            return Response(data={
                'info': rowData[0],
                'isSameUser': request.user.username == rowData[0]["user_id"]
            },
                status=status.HTTP_200_OK)

        except Exception as e:
            print(e)
            return Response(data={},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class GetOwnInfo(generics.RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    repository = InfoRepositorys()

    def post(self, request, format=None):
        data=request.data
        try:
            infoData = self.repository.getOwnInfo(request.user.username)
            stockData = self.repository.getOwnStock(request.user.username)

            return Response(data={
                'info': infoData,
                'stock': stockData,
            },
                status=status.HTTP_200_OK)

        except Exception as e:
            print(e)
            return Response(data={},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class AddInfo(generics.CreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    repository = InfoRepositorys()

    def post(self, request, format=None):
        data=request.data

        try:
            linkedId = None
            if 'text' not in data:
                raise Exception('text is not included in request')
            if len(data["text"]) == 0 or len(data["text"]) > 200:
                raise Exception('text length is not incorect')
            if 'linkedId' in data:
                linkedId = data["linkedId"]
                self.repository.addLinkedCount(linkedId)

            rowData = self.repository.createInfo(data["text"], request.user.username, linkedId)
            print(rowData)
            return Response(data={
                        'id': rowData[0]["info_id"],
                    },
                status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response(data={},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class GetLinkedInfo(generics.RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    repository = InfoRepositorys()

    def post(self, request, format=None):
        data=request.data
        try:
            mainData = self.repository.getInfo(data["info_id"], request.user.username)
            linkedData = self.repository.getMap(data["info_id"], request.user.username, 15)

            return Response(data={
                'mainData': mainData[0],
                'linkedData': linkedData
            },
                status=status.HTTP_200_OK)

        except Exception as e:
            print(e)
            return Response(data={},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class GetMap(generics.RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    repository = InfoRepositorys()

    def post(self, request, format=None):
        data=request.data
        try:

            mainData = self.repository.getInfo(data["info_id"], request.user.username)
            mapData = self.repository.getMap(data["info_id"], request.user.username, 7)
            allMapData = list()

            for num in range(6):
                if len(mapData) == 0:
                    break
                else:
                    allMapData.append(mapData)
                mapData = self.repository.getMap(mapData[0]["info_id"], request.user.username, 7)

            return Response(data={
                'mainData': mainData[0],
                'mapData': allMapData
            },
                status=status.HTTP_200_OK)

        except Exception as e:
            print(e)
            return Response(data={},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class AddLinker(generics.RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    repository = InfoRepositorys()

    def post(self, request, format=None):
        data=request.data
        try:
            self.repository.addLinker(data["type"], data["text"],
                                      data["info1"], data["info2"],
                                      request.user.username)
            return Response(data={},
                status=status.HTTP_200_OK)

        except Exception as e:
            print(e)
            return Response(data={},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class StockInfo(generics.CreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    repository = InfoRepositorys()

    def post(self, request, format=None):
        data=request.data
        try:
            count = self.repository.stockInfo(data["infoId"], request.user.username, data["toStockState"])
            return Response(data={},
                status=status.HTTP_200_OK)

        except Exception as e:
            print(e)
            return Response(data={},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class SearchInfo(generics.RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    repository = InfoRepositorys()

    def post(self, request, format=None):
        data=request.data
        try:
            if 'searchWord' not in data:
                raise Exception('searchWord is not included in request')
            if len(data["searchWord"]) == 0 or len(data["searchWord"]) > 200:
                raise Exception('searchWord length is not incorect')

            rowData = self.repository.searchInfo(data["searchWord"], request.user.username)
            return Response(data=rowData,
                status=status.HTTP_200_OK)

        except Exception as e:
            print(e)
            return Response(data={},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class SearchLinker(generics.RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    repository = InfoRepositorys()

    def post(self, request, format=None):
        data=request.data
        try:
            if 'searchWord' not in data:
                raise Exception('searchWord is not included in request')
            if len(data["searchWord"]) == 0 or len(data["searchWord"]) > 200:
                raise Exception('searchWord length is not incorect')
            rowData = self.repository.searchLinker(data["searchWord"])
            return Response(data=rowData,
                status=status.HTTP_200_OK)

        except Exception as e:
            print(e)
            return Response(data={},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class SearchLinkedInfo(generics.RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    repository = InfoRepositorys()

    def post(self, request, format=None):
        data=request.data
        try:
            if 'searchWord' not in data:
                raise Exception('searchWord is not included in request')
            if len(data["searchWord"]) == 0 or len(data["searchWord"]) > 200:
                raise Exception('searchWord length is not incorect')
            rowData = self.repository.searchLinkedInfo(data["searchWord"], request.user.username)
            print(rowData)
            return Response(data=rowData,
                status=status.HTTP_200_OK)

        except Exception as e:
            print(e)
            return Response(data={},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class GetLinkerData(generics.RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    repository = InfoRepositorys()

    def post(self, request, format=None):
        data=request.data
        try:
            rowData = self.repository.getLinkerData(data["linkerId"], request.user.username)
            print(rowData)
            return Response(data=rowData[0],
                status=status.HTTP_200_OK)

        except Exception as e:
            print(e)
            return Response(data={},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class GetAllLinkers(generics.RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    repository = InfoRepositorys()

    def post(self, request, format=None):
        data=request.data
        try:
            infoData = self.repository.getInfo(data["infoId"], request.user.username)
            linkerData = self.repository.getAllLinkerData(data["infoId"])

            return Response(data={
                'info': infoData[0],
                'linkers': linkerData,
            },
                status=status.HTTP_200_OK)

        except Exception as e:
            print(e)
            return Response(data={},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class EditLinkerData(generics.CreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    repository = InfoRepositorys()

    def post(self, request, format=None):
        data = request.data
        try:
            count = self.repository.editLinker(data["linkerId"], data["type"], data["text"])
            return Response(data={},
                            status=status.HTTP_200_OK)

        except Exception as e:
            print(e)
            return Response(data={},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)