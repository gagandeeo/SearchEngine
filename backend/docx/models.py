from django.db import models

# Create your models here.


def upload_tofile(instance, filename):
    return 'file/{filename}'.format(filename=filename)


def upload_topreview(instance, filename):
    return 'preview/{filename}'.format(filename=filename)


class CategoryModel(models.Model):
    name = models.CharField(max_length=128, blank=True, null=True)

    def __str__(self):
        return self.name


class UploadModel(models.Model):

    title = models.CharField(max_length=128, blank=True, null=True)
    description = models.CharField(max_length=512, blank=True, null=True)
    genre = models.CharField(max_length=128, blank=True, null=True)
    uploadFile = models.FileField(upload_to=upload_tofile,
                                  blank=True,
                                  null=True)
    preview = models.ImageField(upload_to=upload_topreview,
                                blank=True,
                                null=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    class Meta:
        ordering = ['-created_at']