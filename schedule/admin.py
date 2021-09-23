from django.contrib import admin
from .models import Schedule

# Register your models here.
class ScheduleAdmin(admin.ModelAdmin):
    # list_display = ('start_date', 'end_date', 'training_group', 'course', 'teacher', 'room',)
    pass



admin.site.register(Schedule, ScheduleAdmin)