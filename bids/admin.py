from django.contrib import admin
from .models import EventBid, ProgramBid, PlanBid, EducationBid


admin.site.register(EventBid)
admin.site.register(ProgramBid)
admin.site.register(PlanBid)
admin.site.register(EducationBid)