from django.contrib import admin
from .models import Checkpoint, CheckpointsName, Grade, StudentCheckpoint


admin.site.register(CheckpointsName)
admin.site.register(Checkpoint)
admin.site.register(Grade)
admin.site.register(StudentCheckpoint)
