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
        sended = send_mail(subject, "message", 'idab.guu@gmail.com',['x3mart@gmail.com'], html_message=message_html,)
        # sended = await send_mail(subject, "message", 'idab.guu@gmail.com',[student.email, 'viperovm@gmail.com'], html_message=message_html,)

def send_mail_task(students, teacher, task):
    for student in students:
        TaskEmailThread(student, teacher, task).start()


class LkSolutionSerializer(serializers.ModelSerializer):
    student = LkStudentSerializer(read_only=True, many=False)
    task = serializers.CharField(read_only=True, source='task.name')
    class Meta:
        model = Solution
        fields = '__all__'
    
    def create(self, validated_data):
        request = self.context['request']
        student = request.data.get('student')
        if student is not None:
            student = Student.objects.get(pk=int(student))
            validated_data['student']=student
        else:
            raise serializers.ValidationError({
                'student': 'Обязательное поле!'
            })
        task = request.data.get('task')
        if task is not None:
            task = Task.objects.get(pk=task)
            validated_data['task']=task
        else:
            raise serializers.ValidationError({
                'task': 'Обязательное поле!'
            })
        solution = Solution(**validated_data)
        solution.save()
        return solution


class LkTaskSerializer(serializers.ModelSerializer):
    training_group = serializers.CharField(read_only=True, source='training_group.basic.name')
    class Meta:
        model = Task
        fields = '__all__'
        extra_kwargs = {'traning_group': {'read_only': True, 'required': False},
        'students': {'read_only': True, 'required': False},
        'teacher': {'read_only': True, 'required': False},
        }
    
    def create(self, validated_data):
        request = self.context['request']
        students = request.data.get('students')
        teacher = request.data.get('teacher')
        training_group = request.data.get('training_group')
        if students is not None:
            students = list(map(int, students.split()))
            students = Student.objects.filter(id__in=students)
        else:
            raise serializers.ValidationError({
                'details': 'students Обязательное поле!'
            })
        # if teacher is not None:
        #     teacher = Teacher.objects.get(pk=teacher)
        # else:
        #     raise serializers.ValidationError({
        #         'teacher': 'Обязательное поле!'
        #     })
        # if training_group is not None:
        #     training_group = TrainingGroup.objects.get(pk=training_group)
        # else:
        #     raise serializers.ValidationError({
        #         'training_group': 'Обязательное поле!'
        #     })
        teacher = Teacher.objects.get(pk=request.user.id)
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
    class Meta:
        model = Student
        fields = ('id', 'name')
    
    def get_solution(self, obj):
        solution = Solution.objects.filter(student_id=obj.id).filter(task=self.context['task']).first()
        if solution:
            return LkSolutionSerializer(solution).data
        return None


class LkTaskRieveSerializer(serializers.ModelSerializer):
    students = LkTaskStudentSerializer(read_only=True, many=True)
    teacher = LkTeacherSerializer(read_only=True, many=False)
    training_group = serializers.CharField(read_only=True, source='training_group.basic.name')
    class Meta:
        model = Task
        fields = '__all__'