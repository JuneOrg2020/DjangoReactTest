from django.conf.urls import include, url
from rest_framework import routers
from .views import AddInfo, GetOneInfo, GetOwnInfo, GetMap, \
    GetLinkedInfo, AddLinker, StockInfo, SearchInfo, SearchLinker, SearchLinkedInfo,\
    GetLinkerData, EditLinkerData, GetAllLinkers

urlpatterns = [
    url(r'^one', GetOneInfo.as_view()),
    url(r'^map', GetMap.as_view()),
    url(r'^own', GetOwnInfo.as_view()),
    url(r'^addInfo', AddInfo.as_view()),
    url(r'^linked', GetLinkedInfo.as_view()),
    url(r'^addLinker', AddLinker.as_view()),
    url(r'^stock', StockInfo.as_view()),
    url(r'^search/info', SearchInfo.as_view()),
    url(r'^search/linker', SearchLinker.as_view()),
    url(r'^search/relation', SearchLinkedInfo.as_view()),
    url(r'^linkerData', GetLinkerData.as_view()),
    url(r'^editLinker', EditLinkerData.as_view()),
    url(r'^allLinkers', GetAllLinkers.as_view())

]