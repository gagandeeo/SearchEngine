# Generated by Django 3.1.5 on 2021-02-04 16:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('docx', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='categorymodel',
            name='name',
            field=models.CharField(blank=True, max_length=128, null=True),
        ),
    ]