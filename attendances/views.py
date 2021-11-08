from django.http import HttpResponse
import xlwt

from users.models import Student
from schedule.models import Schedule

# Create your views here.
def export_attendance_xls(request):
    response = HttpResponse(content_type='application/ms-excel')
    response['Content-Disposition'] = 'attachment; filename="attendance.xls"'

    wb = xlwt.Workbook(encoding='utf-8')
    ws = wb.add_sheet('Посещаемость')

    # Sheet header, first row
    row_num = 0

    font_style = xlwt.XFStyle()
    font_style.font.bold = True

    schedules = Schedule.objects.all()

    columns = ['Слушатель',]
    for schedule in schedules:
        columns.append(f'{schedule.course.name} {schedule.start_date:"%D"}')

    for col_num in range(len(columns)):
        ws.write(row_num, col_num, columns[col_num], font_style)

    # Sheet body, remaining rows
    font_style = xlwt.XFStyle()

    rows = Student.objects.all()
    for row in rows:
        row_num += 1
        for col_num in range(len(columns)):
            if col_num == 0:
                value = row.name
            else:
                if schedules[col_num -1].attendances.filter(student=row).exists():
                    value = 'да'
                else:
                    value='нет'
            ws.write(row_num, col_num, value, font_style)

    wb.save(response)
    return response