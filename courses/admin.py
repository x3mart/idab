from django.contrib import admin
from .models import CoursesBlock, Course

class CourseAdmin(admin.ModelAdmin):
    list_display = ('name', 'is_active')
    list_filter = ('is_active',)

    def has_delete_permission(self, request, obj=None):
        return False
    


admin.site.register(CoursesBlock)
admin.site.register(Course, CourseAdmin)