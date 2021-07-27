from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Student, Teacher, Manager
from courses.models import Course

class MyUserAdmin(UserAdmin):
    ordering = ('email',)
    fieldsets = ((None, {'fields':('name', 'email', 'password', 'avatar', 'is_superuser', 'is_staff', 'is_active')}),)
    add_fieldsets = ((None, {'fields':('name', 'email', 'password', 'avatar', 'is_staff', 'is_active')}),)
    list_display = ('name', 'email', 'is_superuser', 'is_staff', 'is_active',)


class CourseInline(admin.TabularInline):
    model = Course.teachers.through
    extra = 0
    verbose_name = 'Курс'
    verbose_name_plural = 'Читаемые курсы'



class TeacherAdmin(UserAdmin):
    ordering = ('email',)
    fieldsets = ((None, {'fields':('name', 'email', 'password', 'is_active', 'short_position', 'full_position', 'description', 'link', 'avatar')}),)
    add_fieldsets = ((None, {'fields':('name', 'email', 'password', 'is_active', 'short_position', 'full_position', 'description', 'link', 'avatar')}),)
    list_display = ('name', 'email', 'is_active', 'on_site')
    list_editable = ('is_active', 'on_site')
    inlines = [
        CourseInline,
    ]


class ManagerAdmin(admin.ModelAdmin):
    list_display = ('get_name', 'short_position', 'get_is_active')

    def get_name(self, obj):
        return obj.user.name

    def get_is_active(self, obj):
        return obj.user.is_active
    
    get_name.short_description = 'Имя'
    get_is_active.short_description = 'is_active'

admin.site.register(User)
admin.site.register(Student)
admin.site.register(Manager, ManagerAdmin)
admin.site.register(Teacher, TeacherAdmin)