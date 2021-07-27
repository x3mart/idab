from django.contrib import admin
from .models import Contact, Phone, Social, Review, Faq, Section, SubSection

class PhoneInline(admin.TabularInline):
    model = Phone


class SocialInline(admin.TabularInline):
    model = Social


class ContactAdmin(admin.ModelAdmin):
    inlines = [
        SocialInline,
        PhoneInline,
    ]


admin.site.register(Phone)
admin.site.register(Social)
admin.site.register(Contact, ContactAdmin)
admin.site.register(Review)
admin.site.register(Faq)
admin.site.register(Section)
admin.site.register(SubSection)
