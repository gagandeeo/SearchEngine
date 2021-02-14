from django.db import models
from rest_framework import serializers
from .models import UploadModel, CategoryModel


class UploadModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = UploadModel
        fields = '__all__'


class CategoryModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoryModel
        fields = '__all__'