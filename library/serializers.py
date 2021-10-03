from rest_framework import serializers
from library.models import Library


class LkLibrarySerializer(serializers.ModelSerializer):

    class Meta:
        model = Library
        fields = '__all__'