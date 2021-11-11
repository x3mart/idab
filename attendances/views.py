from django.http import HttpResponse
from django.http.response import HttpResponseForbidden
import xlwt
from rest_framework.views import APIView
from users.models import Student
from schedule.models import Schedule
from programs.models import TrainingGroup

# Create your views here.
class ExportAttendanceXls(APIView):
    def get(self, request, format=None):
        response = HttpResponse(content_type='application/ms-excel')
        response['Content-Disposition'] = 'attachment; filename="attendance.xls"'
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
            schedules = Schedule.objects.filter(training_group=training_group).order_by('-start_date')
            columns = ['Слушатель',]
            for schedule in schedules:
                columns.append(f'{schedule.course.name} {schedule.start_date:%D}')
            for col_num in range(len(columns)):
                ws.write(row_num, col_num, columns[col_num], font_style)
            if user.is_student:
                rows = [user,]
            else:
                rows = Student.objects.filter(training_group=training_group)
            for row in rows:
                row_num += 1
                for col_num in range(len(columns)):
                    if col_num == 0:
                        value = row.name
                        font_style = xlwt.easyxf('font: colour black, bold False;')
                    else:
                        if row.id in schedules[col_num -1].visited_students.values_list('id', flat=True):
                            value = 'да'
                            font_style = xlwt.easyxf('font: colour green, bold False;')
                        else:
                            value='нет'
                            font_style = xlwt.easyxf('font: colour red, bold True;')
                    ws.write(row_num, col_num, value, font_style)
        wb.save(response)
        return response