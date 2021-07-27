from django.contrib import admin
from django import forms
from django.db import models
from .models import ImageIdab, Gallery
from django.utils.safestring import mark_safe

# Register your models here.
class GalleryForm(forms.ModelForm):
    images = forms.ImageField(label=u'Фотографии', widget=forms.FileInput(attrs={'multiple': 'multiple'}), required=False)

    class Meta:
        model = Gallery
        fields = '__all__'


class ImageInline(admin.StackedInline):
    model = ImageIdab
    readonly_fields = ('get_photo',)
    fields =  ('get_photo',)
    extra = 0

    def get_photo(self, obj):
        if obj.image:
            return mark_safe(f'<a href={obj.image.url} target="_blank"><img src="{obj.get_tmb_url}" width="45"></a>')
        else:
            return '-'
    
    get_photo.short_description = 'Миниатюра'


class GalleryAdmin(admin.ModelAdmin):
    form = GalleryForm
    inlines = [
        ImageInline,
    ]

    def save_model(self, request, obj, form, change):
        obj.save()
        for f in request.FILES.getlist('images'):
            obj.images.create(image = f)


admin.site.register(Gallery, GalleryAdmin)