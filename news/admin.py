from django.contrib import admin
from django import forms
from .models import Event
from ckeditor_uploader.widgets import CKEditorUploadingWidget


# class NewsAdminForm(forms.ModelForm):
#     body = forms.CharField(widget=CKEditorUploadingWidget())
#     class Meta:
#         model = NewsBase
#         fields = '__all__'

# class NewsAdmin(admin.ModelAdmin):
#     form = NewsAdminForm


# admin.site.register(News, NewsAdmin)
admin.site.register(Event)