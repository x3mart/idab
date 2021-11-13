from django.contrib import admin
from django import forms
from django.contrib.auth.admin import UserAdmin
from .models import User, Student, Teacher, Manager
from courses.models import Course

class UserCreationForm(forms.ModelForm):
    """A form for creating new users. Includes all the required
    fields, plus a repeated password."""
    password1 = forms.CharField(label='Password', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Password confirmation', widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ('email', 'name', 'avatar', 'is_superuser', 'is_staff', 'is_active')

    def clean_password2(self):
        # Check that the two password entries match
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("Passwords don't match")
        return password2

    def save(self, commit=True):
        # Save the provided password in hashed format
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user


class MyUserAdmin(UserAdmin):
    add_form = UserCreationForm
    ordering = ('email',)
    fieldsets = ((None, {'fields':('name', 'email', 'password', 'avatar', 'is_superuser', 'is_staff', 'is_active')}),)
    add_fieldsets = (None, {
            'classes': ('wide',),
            'fields': ('email', 'name', 'password1', 'password2', 'avatar', 'is_superuser', 'is_staff', 'is_active'),
        }),
    list_display = ('name', 'email', 'is_superuser', 'is_staff', 'is_teacher', 'is_student', 'is_active',)


class CourseInline(admin.TabularInline):
    model = Course.teachers.through
    extra = 0
    verbose_name = 'Курс'
    verbose_name_plural = 'Читаемые курсы'

class TeacherCreationForm(UserCreationForm):
    class Meta:
        model = Teacher
        fields = ('email', 'name', 'is_active', 'short_position', 'full_position', 'description', 'link', 'avatar')
    

class TeacherAdmin(UserAdmin):
    add_form = TeacherCreationForm
    ordering = ('email',)
    fieldsets = ((None, {'fields':('name', 'email', 'password', 'is_active', 'is_staff', 'short_position', 'full_position', 'description', 'link', 'avatar', 'groups', 'user_permissions')}),)
    add_fieldsets = ((None, {'fields':('email', 'name', 'password1', 'password2', 'is_active', 'is_staff', 'short_position', 'full_position', 'description', 'link', 'avatar', 'groups', 'user_permissions', )}),)
    list_display = ('name', 'email', 'is_active', 'on_site', 'last_login')
    list_editable = ('is_active', 'on_site')
    inlines = [
        CourseInline,
    ]

    def save_model(self, request, obj, form, change):
        if not obj.is_teacher:
            obj.is_teacher = True
        return super().save_model(request, obj, form, change)

class StudentAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'is_active', 'last_login', 'get_training_group')
    list_editable = ('is_active',)
    exclude = ('groups','user_permissions', 'is_superuser', 'is_student', 'is_teacher', 'password')
    readonly_fields = ('last_login',)
    list_filter = ('training_group',)
    

    def has_add_permission(self, request):
        return False
    
    def has_delete_permission(self, request, obj=None):
        return False

    def get_training_group(self, instance):
        try:
            return instance.training_group.first()
        except:
            return '---'
    get_training_group.short_description = 'Группа'


class ManagerAdmin(admin.ModelAdmin):
    list_display = ('get_name', 'short_position', 'get_is_active')

    def get_name(self, obj):
        return obj.user.name

    def get_is_active(self, obj):
        return obj.user.is_active
    
    get_name.short_description = 'Имя'
    get_is_active.short_description = 'is_active'

admin.site.register(User, MyUserAdmin)
admin.site.register(Student, StudentAdmin)
admin.site.register(Manager, ManagerAdmin)
admin.site.register(Teacher, TeacherAdmin)