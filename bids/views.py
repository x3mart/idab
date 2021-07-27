from django.shortcuts import render
from rest_framework.generics import CreateAPIView
from .models import EventBid, ProgramBid, PlanBid, EducationBid
from .serializers import EventBidSerializer, ProgramBidSerializer, PlanBidSerializer, EducationBidSerializer


class EventBidView(CreateAPIView):
    queryset = EventBid.objects.all()
    serializer_class = EventBidSerializer


class ProgramBidView(CreateAPIView):
    queryset = ProgramBid.objects.all()
    serializer_class = ProgramBidSerializer


class PlanBidView(CreateAPIView):
    queryset = PlanBid.objects.all()
    serializer_class = PlanBidSerializer


class EducationBidView(CreateAPIView):
    queryset = EducationBid.objects.all()
    serializer_class = EducationBidSerializer