from django.http.response import HttpResponseForbidden
from rest_framework.response import Response
import xlwt
from rest_framework.views import APIView
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