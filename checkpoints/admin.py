from django.contrib import admin
from .models import Checkpoint, CheckpointsName, CheckpointMark


admin.site.register(CheckpointsName)
admin.site.register(Checkpoint)
admin.site.register(CheckpointMark)

