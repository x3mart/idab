from django.contrib import admin
from .models import CoursesBlock, Course
from checkpoints.models import Checkpoint

class CheckpointInline(admin.TabularInline):
    model = Checkpoint

class CourseAdmin(admin.ModelAdmin):
    inlines = [
        CheckpointInline,
    ]


admin.site.register(CoursesBlock)
admin.site.register(Course, CourseAdmin)