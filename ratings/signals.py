from django.db.models.aggregates import Avg, Sum
from django.dispatch import receiver
from django.db.models.signals import post_delete, post_init, post_save
from django.utils import timezone
from ratings.models import Rating
from users.models import Student
from checkpoints.models import CheckpointMark
from schedule.models import Schedule
from tasks.models import Solution, Task


def get_schedule_rating(rating_prc):
    if rating_prc >= 80:
        return 30
    if rating_prc in range(60, 79):
        return 20
    if rating_prc in range(50, 59):
        return 10
    if rating_prc in range(30, 49):
        return 10
    return 0

def get_rating_obj(student):
    if not hasattr(student, 'rating'):
        rating = Rating.objects.create(student=student)
    else:
        rating = Rating.objects.get(student=student)
    return rating

def get_checkpoints_rating(rating, student):
    schedules = Schedule.objects.filter(training_group=student.training_group.first()).filter(start_date__lt=timezone.now())
    checkpoints = schedules.exclude(checkpoint__isnull=True)
    checkpoints_count = checkpoints.count()
    completed_checkpoints = CheckpointMark.objects.filter(student=student)
    if checkpoints_count and completed_checkpoints.exists():
        completed_checkpoints_marks_avg = completed_checkpoints.aggregate(Avg('mark'))['mark__avg']
        completed_checkpoints_sum = completed_checkpoints.aggregate(Sum('mark'))['mark__sum']
        checkpoints_rating = completed_checkpoints_sum/checkpoints_count
    else:
        completed_checkpoints_marks_avg = 0
        completed_checkpoints_sum = 0
        checkpoints_rating = 0
    rating.checkpoints_count = checkpoints_count
    rating.completed_checkpoints = completed_checkpoints.count()
    rating.completed_checkpoints_marks_avg = completed_checkpoints_marks_avg
    rating.checkpoints_rating = checkpoints_rating
    return rating

@receiver(post_save, sender=Student)
def user_post_save(instance, created, **kwargs):
    if created:
        Rating.objects.create(student=instance)

@receiver(post_save, sender=CheckpointMark)
def checkpoint_mark_post_save(instance, created, **kwargs):
    student = instance.student
    rating = get_rating_obj(student)
    rating = get_checkpoints_rating(rating, student)
    rating.save()

@receiver(post_save, sender=Task)
def task_post_save(instance, created, **kwargs):
    students = instance.students.all()
    for student in students:
        rating = get_rating_obj(student)
        tasks_count = student.tasks.count()
        solutions = Solution.objects.filter(student=student)
        solutions_count = solutions.count()
        solutions_mark_avg = solutions.aggregate(Avg('mark'))['mark__avg']
        solutions_sum = solutions.aggregate(Sum('mark'))['mark__sum']
        if tasks_count and solutions_sum:
            tasks_rating = solutions_sum/tasks_count
        else:
            tasks_rating = 0
        if solutions_mark_avg is None:
            solutions_mark_avg = 0
        rating.tasks_count = tasks_count 
        rating.solutions_count = solutions_count 
        rating.solutions_mark_avg = solutions_mark_avg 
        rating.tasks_rating = tasks_rating 
        rating.save()

@receiver(post_save, sender=Solution)
def solution_post_save(instance, created, **kwargs):
    student = instance.student
    rating = get_rating_obj(student)
    tasks_count = student.tasks.count()
    solutions = Solution.objects.filter(student=student)
    solutions_count = solutions.count()
    solutions_mark_avg = solutions.aggregate(Avg('mark'))['mark__avg']
    solutions_sum = solutions.aggregate(Sum('mark'))['mark__sum']
    if tasks_count and solutions_sum:
        tasks_rating = solutions_sum/tasks_count
    else:
        tasks_rating = 0
    if solutions_mark_avg is None:
        solutions_mark_avg = 0
    rating.tasks_count = tasks_count 
    rating.solutions_count = solutions_count 
    rating.solutions_mark_avg = solutions_mark_avg 
    rating.tasks_rating = tasks_rating 
    rating.save()

@receiver(post_save, sender=Schedule)
def attendance_post_save(instance, created, **kwargs):
    training_group = instance.training_group
    schedule_count = Schedule.objects.filter(training_group=training_group).filter(start_date__lt=timezone.now()).count()
    students = Student.objects.filter(training_group=training_group).prefetch_related('attendances')
    for student in students:
        rating = get_rating_obj(student)
        if hasattr(instance, 'checkpoint'):
            rating = get_checkpoints_rating(rating, student)
        attendances_count = Schedule.objects.filter(visited_students=student).count()
        rating.attendances_count = attendances_count
        rating.schedule_count = schedule_count
        if schedule_count:
            attendances_rating_prc = (attendances_count/schedule_count)*100
        else:
            attendances_rating_prc = 0
        rating.attendances_rating_prc = attendances_rating_prc
        rating.attendances_rating = get_schedule_rating(attendances_rating_prc)
        rating.save()