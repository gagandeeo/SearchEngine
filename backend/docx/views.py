from django.shortcuts import render
from rest_framework import viewsets, parsers
from .serializers import *
from .models import *

# Create your views here.


class UploadModelViewSet(viewsets.ModelViewSet):

    serializer_class = UploadModelSerializer
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]

    def get_queryset(self):
        return UploadModel.objects.all()
