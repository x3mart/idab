from multiprocessing import context
import threading
from programs.models import TrainingGroup
from rest_framework import serializers
from django.template.loader import render_to_string
from django.core.mail import send_mail
from users.serializers import LkStudentSerializer, LkTeacherSerializer
from .models import Solution, Task
from users.models import Teacher, Student
import asyncio

class TaskEmailThread(threading.Thread):
    def __init__(self, student, teacher, task):
        self.student = student
        self.teacher = teacher
        self.task = task
        threading.Thread.__init__(self)
    
    def run(self):
        subject = f'{self.student.name}, Вы получили новое задание'
        task_data = {'student':self.student, "teacher":self.teacher, "task":self.task}
        message_html = render_to_string("task_mail.html", task_data)
        sended = send_mail(subject, "message", 'idab.guu@gmail.com',[self.student.email, 'viperovm@gmail.com'], html_message=message_html,)

def send_mail_task(students, teacher, task):
    for student in students:
        TaskEmailThread(student, teacher, task).start()


class LkSolutionSerializer(serializers.ModelSerializer):
    # file = serializers.SerializerMethodField(read_only=True, method_name='get_file_absolute_url')
    class Meta:
        model = Solution
        exclude = ('task', 'student')
    
    # def get_file_absolute_url(self, obj):
    #     if obj.file:
    #         request = self.context.get('request')
    #         return request.build_absolute_uri(obj.file.url)
    #     return None


class StudentsSerializer(serializers.ModelSerializer):
    solution = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Student
        fields = ('id', 'name', 'solution')
    
    def get_solution(self, obj):
        request = self.context.get('request')
        solution = Solution.objects.filter(student=obj).filter(task_id=self.context.get('task')).first()
        if solution:
            return LkSolutionSerializer(solution, many=False, context={'request':request}).data
        else:
            return None

class LkTaskSerializer(serializers.ModelSerializer):
    training_group = serializers.CharField(read_only=True, source='training_group.basic.name')
    students = serializers.SerializerMethodField()
    
    class Meta:
        model = Task
        fields = '__all__'
        extra_kwargs = {'training_group': {'read_only': True, 'required': False},
        'teacher': {'read_only': True, 'required': False},
        }
    
    def get_students(self, obj):
        request = self.context.get('request')
        return StudentsSerializer(obj.students, many=True, context={'task': obj.id, 'request':request}).data
    
    def create(self, validated_data):
        request = self.context['request']
        students = request.data.get('students')
        training_group = request.data.get('training_group')
        if students is not None:
            students = list(map(int, students.split()))
            students = Student.objects.filter(id__in=students)
        else:
            raise serializers.ValidationError({
                'details': 'students Обязательное поле!'
            })
        teacher = Teacher.objects.get(pk=request.user.id)
        training_group = TrainingGroup.objects.get(pk=training_group)
        task = Task(**validated_data)
        task.teacher=teacher
        task.training_group=training_group
        task.save()
        task.students.set(students)
        send_mail_task(students, teacher, task)
        return task

    def update(self, instance, validated_data):
        request = self.context['request']
        students = request.data.get('students')
        teacher = Teacher.objects.get(pk=request.user.id)
        if students is not None:
            students = list(map(int, students.split()))
            students = TrainingGroup.objects.filter(pk__in=students)
            task.students.set(students)
        task = super().update(instance, validated_data)
        return task 


class LkTaskStudentSerializer(serializers.ModelSerializer):
    solution = serializers.SerializerMethodField()
    teacher = serializers.SerializerMethodField()
    class Meta:
        model = Task
        fields = '__all__'
    
    def get_solution(self, obj):
        solution = obj.solutions.filter(student_id=self.context['request'].user.id).first()
        if solution:
            request = self.context.get('request')
            return LkSolutionSerializer(solution, context={'request':request}).data
        return None
    
    def get_teacher(self, obj):
        if obj.teacher:
            return obj.teacher.name
        return None


class SolutionMarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Solution
        fields = ('mark',)