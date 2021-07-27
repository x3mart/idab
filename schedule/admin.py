from django.contrib import admin
from .models import Schedule

# Register your models here.
class ScheduleAdmin(admin.ModelAdmin):
    list_display = ('traning_day', 'start_time', 'end_time', 'training_group', 'course', 'teacher', 'room',)



admin.site.register(Schedule, ScheduleAdmin)