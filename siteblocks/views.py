from django.shortcuts import render
from rest_framework import status, viewsets
from .models import Contact, Review, Faq, Section
from users.models import Teacher, Manager
from programs.models import Category, Program
from galleries.models import Gallery, ImageIdab
from .serializers import ContactSerializer, CategorySerializer, ProgramSerializer, CategoryNameSerializer, TeacherNameSerializer, TeacherSerializer, EventShortSerializer, EventSerializer, ReviewSerializer, ReviewVideoSerializer, FaqSerializer, ManagerSerializer, ManagerNameSerializer, SectionSerializer, GallerySerializer
from news.models import Event
import datetime
from rest_framework.response import Response


class ContactViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Contact.objects.all().exclude(is_active=False)
    serializer_class = ContactSerializer

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all().exclude(is_active=False)
    lookup_field = 'slug'
    def get_serializer_class(self):
        if self.action == 'list':
            return CategoryNameSerializer
        return CategorySerializer

class ProgramViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Program.objects.all().exclude(is_active=False)
    serializer_class = ProgramSerializer
    lookup_field = 'slug'


class ManagmentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Manager.objects.all().exclude(user__is_active=False).filter(is_leader=False)
    serializer_class = ManagerSerializer


class LeaderViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Manager.objects.all().filter(is_leader=True)
    serializer_class = ManagerSerializer


class TeacherViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Teacher.objects.all().exclude(on_site=False)
    serializer_class = TeacherSerializer


# class NewsViewSet(viewsets.ReadOnlyModelViewSet):
#     queryset = News.objects.all().exclude(is_active=False)
#     def get_serializer_class(self):
#         if self.action == 'list':
#             return NewsShortSerializer
#         return NewsSerializer


class EventViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Event.objects.all().exclude(enddate__lt=datetime.datetime.now())
    def get_serializer_class(self):
        if self.action == 'list':
            return EventShortSerializer
        return EventSerializer
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        instance.view = instance.view + 1
        instance.save()
        return Response(serializer.data)


class ReviewViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Review.objects.all().exclude(is_active=False).exclude(body__isnull=True).exclude(body__exact='')
    serializer_class = ReviewSerializer

class ReviewVideoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Review.objects.all().exclude(is_active=False).exclude(video__isnull=True).exclude(video__exact='')
    serializer_class = ReviewVideoSerializer


class FaqViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Faq.objects.all().exclude(is_active=False)
    serializer_class = FaqSerializer


class SectionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Section.objects.all().exclude(is_active=False)
    serializer_class = SectionSerializer


class GalleryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Gallery.objects.all()
    serializer_class = GallerySerializer