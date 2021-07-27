from django.contrib import admin
from .models import Program, TrainingGroupBasic, TrainingGroup, Category


class ProgramInline(admin.TabularInline):
    model = Program
    fieldsets = ((None, {'fields':('name', 'number', 'is_active')}),)
    extra = 0

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'number', 'is_active',)
    list_editable = ('number', 'is_active',)
    prepopulated_fields = {"slug": ("name",)}
    inlines = [
        ProgramInline,
    ]


class ProgramAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("name",)}


admin.site.register(Category, CategoryAdmin)
admin.site.register(Program, ProgramAdmin)
admin.site.register(TrainingGroupBasic)
admin.site.register(TrainingGroup)