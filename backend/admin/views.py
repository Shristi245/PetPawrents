from rest_framework import generics, status
from rest_framework.response import Response
from user.models import AppUser
from user.serializers import UserSerializer
from rest_framework.exceptions import NotFound  # Correct import for NotFound exception

class UserListView(generics.ListCreateAPIView):
    queryset = AppUser.objects.all()
    serializer_class = UserSerializer

    def delete(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            self.perform_destroy(instance)
            return Response(status=status.HTTP_204_NO_CONTENT)
        except NotFound:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
