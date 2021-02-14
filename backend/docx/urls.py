from rest_framework import routers
from .views import *

router = routers.DefaultRouter()
router.register('api/upload', UploadModelViewSet, basename='upload')

urlpatterns = router.urls
