# Generated by Django 3.1.5 on 2021-02-04 16:46

from django.db import migrations, models
import docx.models


class Migration(migrations.Migration):

    dependencies = [
        ('docx', '0002_categorymodel_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='uploadmodel',
            name='preview',
            field=models.ImageField(blank=True, null=True, upload_to=docx.models.upload_topreview),
        ),
        migrations.AddField(
            model_name='uploadmodel',
            name='uploadFile',
            field=models.FileField(blank=True, null=True, upload_to=docx.models.upload_tofile),
        ),
    ]