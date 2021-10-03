from programs.models import TrainingGroup
from rest_framework import serializers
from django.template.loader import render_to_string
from django.core.mail import send_mail
from users.serializers import LkStudentSerializer, LkTeacherSerializer
from .models import Task
from users.models import Teacher, Student


class LkTaskSerializer(serializers.ModelSerializer):
    teacher = LkStudentSerializer(read_only=True, many=False)
    students = LkTeacherSerializer(read_only=True, many=True)
    class Meta:
        model = Task
        fields = '__all__'
    
    def create(self, validated_data):
        request = self.context['request']
        students = request.data.get('students')
        teacher = request.data.get('teacher')
        if students is not None:
            students = list(map(int, students.split()))
            print(students)
            students = Student.objects.filter(id__in=students)
        else:
            raise serializers.ValidationError({
                'students': 'Обязательное поле!'
            })
        if teacher is not None:
            teacher = Teacher.objects.get(pk=teacher)
        else:
            raise serializers.ValidationError({
                'teacher': 'Обязательное поле!'
            })
        task = Task(**validated_data)
        task.teacher=teacher
        task.save()
        for student in students:
            task.students.add(student)
            subject = f'{student.name}, Вы получили новое задание'
            task_data = {'student':student, "teacher":teacher, "task":task}
            # message = render_to_string("confirmation_mail_text.html", order_data)
            message_html = render_to_string("task_mail.html", task_data)
            sended = send_mail(subject, "message", 'idab.guu@gmail.com',[student.email, 'viperovm@gmail.com'], html_message=message_html,)
        return task

    def update(self, instance, validated_data):
        request = self.context['request']
        students = request.data.get('students')
        teacher = request.data.get('teacher')
        if students is not None:
            students = TrainingGroup.objects.filter(pk__in=students)
        if teacher is not None:
            teacher = Teacher.objects.get(pk=teacher)
            validated_data['teacher']=teacher
        task = super().update(instance, validated_data)
        return task 
