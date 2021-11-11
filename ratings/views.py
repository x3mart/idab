from django.db.models.aggregates import Avg, Sum
from django.db.models.expressions import F, Value
from django.db.models.query import Prefetch
from django.db.models.query_utils import Q
from django.http import HttpResponse
from django.http.response import HttpResponseForbidden
from rest_framework.response import Response
import xlwt
from django.utils import timezone
from rest_framework.views import APIView
from django.db.models import Count, Case, When, IntegerField
from ratings.models import Rating
from ratings.serializers import StudentRatingSerializer
from schedule.models import Schedule
from programs.models import TrainingGroup

from users.models import Student

# Create your views here.
class RatingView(APIView):
    def get(self, request, format=None):
        user  = request.user
        if user.is_anonymous:
            return HttpResponseForbidden()
        rating = Rating.objects.all()
        return Response(StudentRatingSerializer(rating, many=True).data, status=200)