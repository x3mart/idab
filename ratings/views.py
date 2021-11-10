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
        schedule = Schedule.objects.prefetch_related('checkpoint')
        prefetched_schedule = Prefetch('schedule', schedule)
        training_group = TrainingGroup.objects.prefetch_related(prefetched_schedule).prefetch_related('basic').annotate(schedule_count=Count('schedule', filter=Q(schedule__start_date__lte=timezone.now())), checkpoints_count=Count('schedule', filter=(Q(schedule__start_date__lte=timezone.now()) & ~Q(schedule__checkpoint__isnull=True))))
        prefetched_training_group = Prefetch('training_group', training_group)
        students = Student.objects.prefetch_related(prefetched_training_group).prefetch_related('chekpoint_marks').annotate(attendace_count=Count('attendances'), checkpoints_sum=Sum('chekpoint_marks__mark'), completed_checkpoints=Count('chekpoint_marks'), completed_checkpoints_marks_avg=Avg('chekpoint_marks__mark')).annotate(tasks_count=Count('tasks'), solutions_mark_avg=Avg('solutions__mark'), solutions_count=Count('solutions'), solutions_sum=Sum('solutions__mark')).annotate(tasks_rating=Case(When(tasks_count__gt=0, then=F('solutions_sum')/F('tasks_count')), default=0))
        return Response(StudentRatingSerializer(students, many=True).data, status=200)