from django import forms
from django.contrib import admin
from django.db.models.query import Prefetch

from courses.models import Course
from .models import Schedule

# Register your models here.
class ScheduleAdmin(admin.ModelAdmin):
    list_display = ('start_date', 'end_date', 'training_group', 'course', 'teacher', 'room',)
    # course = forms.course.queryset = Course.objects.filter(is_active=True)
    def get_form(self, request, obj, **kwargs):
        form = super().get_form(request, obj=obj, **kwargs)
        form.base_fields['course'].queryset = Course.objects.filter(is_active=True)
        return form

admin.site.register(Schedule, ScheduleAdmin)