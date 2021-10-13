from django.contrib import admin
from .models import CoursesBlock, Course

class CourseAdmin(admin.ModelAdmin):
    pass


admin.site.register(CoursesBlock)
admin.site.register(Course, CourseAdmin)