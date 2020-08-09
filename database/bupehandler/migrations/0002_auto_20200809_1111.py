# Generated by Django 3.1 on 2020-08-09 15:11

import bupehandler.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bupehandler', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='provider',
            name='provider_id',
            field=models.CharField(default=bupehandler.models.increment_provider_id, editable=False, max_length=30, primary_key=True, serialize=False, unique=True),
        ),
    ]
