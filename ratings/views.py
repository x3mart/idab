from django.http import HttpResponse
from django.http.response import HttpResponseForbidden
import xlwt
from rest_framework.views import APIView
from users.models import Student
from schedule.models import Schedule
from programs.models import TrainingGroup
from rest_framework.response import Response
from ratings.models import Rating
from ratings.serializers import StudentRatingSerializer

# Create your views here.
class RatingView(APIView):
    def get(self, request, format=None):
        user  = request.user
        if user.is_anonymous:
            return HttpResponseForbidden()
        rating = Rating.objects.all()
        return Response(StudentRatingSerializer(rating, many=True).data, status=200)

class ExportRatingXls(APIView):
    def get(self, request, format=None):
        response = HttpResponse(content_type='application/ms-excel')
        response['Content-Disposition'] = 'attachment; filename="rating.xls"'
        user = request.user
        if request.user.is_anonymous:
            return HttpResponseForbidden()
        training_groups = TrainingGroup.objects.all()
        wb = xlwt.Workbook(encoding='utf-8')
        if user.is_student:
            training_groups = training_groups.filter(students__in=[user,])
        if user.is_teacher:
            training_groups = training_groups.filter(schedule__teacher=user)
        if not training_groups.exists():
            ws = wb.add_sheet('-')
            wb.save(response)
            return response
        for training_group in training_groups:   
            ws = wb.add_sheet((f'{training_group.basic.name} {training_group.start_date:%Y-%m} {training_group.graduation_date:%Y-%m}').replace(',', ''))
            row_num = 0
            font_style = xlwt.easyxf('font: colour black, bold True; align: wrap on, vert centre, horiz center;')
            columns = ['Слушатель', 'Общий рейтинг', 'Прошло занятий', 'Посещенные занятия', 'Посещаемость в %', 'Рейтинг посещаемости', 'Прошло контрольных точек (КТ)', 'Сдано контрольных точек', 'Средний бал за сданные КТ', 'Рейтинг по КТ', 'Всего заданий', 'Выполненных заданий', 'Средний бал за выполненные задания', 'Рейтинг по заданиям'] 
            for col_num in range(len(columns)):
                ws.write(row_num, col_num, columns[col_num], font_style)
            if user.is_student:
                rows = [user,]
            else:
                rows = Student.objects.filter(training_group=training_group).prefetch_related('rating')
            for row in rows:
                row_num += 1
                font_style = xlwt.easyxf('font: colour black, bold False;')
                ws.write(row_num, 0, row.name, xlwt.easyxf('font: colour black, bold True;'))
                if hasattr(row, 'rating'):
                    # total_rating = row.rating.tasks_rating + row.rating.attendances_rating + row.rating.checkpoints_rating
                    ws.write(row_num, 1, row.total_rating, xlwt.easyxf('font: colour black, bold True;'))
                    ws.write(row_num, 2, row.rating.schedule_count, font_style)
                    ws.write(row_num, 3, row.rating.attendances_count, font_style)
                    ws.write(row_num, 4, row.rating.attendances_rating_prc, font_style)
                    ws.write(row_num, 5, row.rating.attendances_rating, xlwt.easyxf('font: colour black, bold True;'))
                    ws.write(row_num, 6, row.rating.checkpoints_count, font_style)
                    ws.write(row_num, 7, row.rating.completed_checkpoints, font_style)
                    ws.write(row_num, 8, row.rating.completed_checkpoints_marks_avg, font_style)
                    ws.write(row_num, 9, row.rating.checkpoints_rating, xlwt.easyxf('font: colour black, bold True;'))
                    ws.write(row_num, 10, row.rating.tasks_count, font_style)
                    ws.write(row_num, 11, row.rating.solutions_count, font_style)
                    ws.write(row_num, 12, row.rating.solutions_mark_avg, font_style)
                    ws.write(row_num, 13, row.rating.tasks_rating, xlwt.easyxf('font: colour black, bold True;'))
        wb.save(response)
        return response