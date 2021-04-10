from django.conf.urls import include, url
from django.contrib import admin
from django.urls import path

from rest_framework_jwt.views import (obtain_jwt_token, refresh_jwt_token,
                                      verify_jwt_token)

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^jwt/', obtain_jwt_token),
    url(r'^token_refresh/', refresh_jwt_token),
    url(r'^token_verify/', verify_jwt_token),

    url(r'^api/user/', include('user.urls')),
    url(r'^api/info/', include('info.urls')),

    url('', include('top.urls')),
    url(r'^[a-zA-Z0-9/]+$', include('top.urls')),
]
