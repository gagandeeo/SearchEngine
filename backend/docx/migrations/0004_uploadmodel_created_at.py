# Generated by Django 3.1.5 on 2021-02-04 16:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('docx', '0003_auto_20210204_1646'),
    ]

    operations = [
        migrations.AddField(
            model_name='uploadmodel',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]
