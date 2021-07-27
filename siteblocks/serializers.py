from rest_framework import serializers
from .models import Contact, Phone, Social, Review, Faq, SubSection, Section
from programs.models import Category, Program
from users.models import Teacher, Manager, User
from news.models import Event
from galleries.models import ImageIdab, Gallery
from django.contrib.humanize.templatetags import humanize


class PhoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Phone
        fields = ['phone']


class SocialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Social
        fields = ['name', 'link']


class ContactSerializer(serializers.ModelSerializer):
    phones = PhoneSerializer(many=True, read_only=True)
    links = SocialSerializer(many=True, read_only=True)

    class Meta:
        model = Contact
        fields = ['id', 'adress', 'email', 'phones', 'links']
        depth = 1


class ProgramNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Program
        fields = ['id', 'name', 'slug', 'short_description']
        depth = 1


class CategoryNameSerializer(serializers.ModelSerializer):
    programs = ProgramNameSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'short_description', 'programs']
        depth = 0


class CategorySerializer(serializers.ModelSerializer):
    programs = ProgramNameSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'short_description', 'full_description', 'programs', 'image']
        depth = 1

class ProgramSerializer(serializers.ModelSerializer):
    # category = CategoryNameSerializer(many=False, read_only=True)

    class Meta:
        model = Program
        fields = ['id', 'name', 'slug', 'short_description', 'full_description', 'start_spring', 'start_autumn', 'price', 'category', 'image', 'meta_title', 'meta_description']
        depth = 1


class TeacherNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ['id', 'name', 'avatar', 'short_position']


class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ['id', 'name', 'avatar', 'short_position', 'full_position', 'description', 'link', 'email']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['name', 'avatar']


class ManagerNameSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False, read_only=True)
    class Meta:
        model = Manager
        fields = ['id', 'user', 'short_position']
        depth = 1


class ManagerSerializer(ManagerNameSerializer):
    name = serializers.ReadOnlyField(source="get_name")
    avatar = serializers.ReadOnlyField(source="get_avatar")
    class Meta:
        model = Manager
        fields = ['id', 'name', 'avatar','short_position', 'full_position', 'description', 'email2']


# class NewsShortSerializer(serializers.ModelSerializer):
#     image = serializers.SerializerMethodField()
#     class Meta:
#         model = News
#         fields = ['id', 'title', 'description', 'image',]
            
#     def get_image(self, obj):
#         return self.context['request'].build_absolute_uri(obj.get_tmb_url)


# class NewsSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = News
#         exclude = ['description', 'is_active']


class EventShortSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    event_date = serializers.ReadOnlyField(source="get_event_date")
    event_time = serializers.ReadOnlyField(source="get_event_time")
    class Meta:
        model = Event
        exclude = ['body', 'startdate', 'enddate', 'starttime', 'endtime']
    
    def get_image(self, obj):
        return self.context['request'].build_absolute_uri(obj.get_tmb_url)


class EventSerializer(EventShortSerializer):
    image = serializers.ImageField()
    class Meta:
        model = Event
        exclude = ['description', 'startdate', 'enddate', 'starttime', 'endtime']


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'


class ReviewVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['video']


class FaqSerializer(serializers.ModelSerializer):
    class Meta:
        model = Faq
        fields = '__all__'

class SubSectionSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = SubSection
        fields = '__all__'

class SectionSerializer(serializers.ModelSerializer):
    subsections = SubSectionSerializer(many=True)

    class Meta:
        model = Section
        fields = '__all__'

class ImageListSerializer(serializers.ModelSerializer):
    tmb = serializers.SerializerMethodField()

    class Meta:
        model = ImageIdab
        fields = ['id', 'image', 'tmb']

    def get_tmb(self, obj):
        return self.context['request'].build_absolute_uri(obj.get_tmb_url)

class GallerySerializer(serializers.ModelSerializer):
    images = ImageListSerializer(many=True, read_only=True)

    class Meta:
        model = Gallery
        fields = ['id', 'name', 'images']