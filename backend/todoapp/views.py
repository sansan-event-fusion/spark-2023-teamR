from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status, viewsets
from .serializers import SignUpSerializer, LoginSerializer, TaskSerializer
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from .models import Task


@api_view(["GET", "POST"])
@permission_classes([AllowAny])
def signup_view(request):
    if request.method == "GET":
        return Response({"message": "Signup page"}, status=status.HTTP_200_OK)
    elif request.method == "POST":
        serializer = SignUpSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            user.set_password(serializer.validated_data["password"])
            user.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([AllowAny])
def signin_view(request):
    serializer = LoginSerializer(data=request.data)
    is_valid = serializer.is_valid(raise_exception=True)
    email = serializer.validated_data.get("email")
    password = serializer.validated_data.get("password")
    user = authenticate(request, email=email, password=password)
    if user is None:
        return JsonResponse(
            data={"msg": "either email or password is incorrect"},
            status=status.HTTP_400_BAD_REQUEST,
        )
    else:
        login(request, user)
        # ここ何を返す？
        return JsonResponse(
            data={"url": "redirect to succcess page"},
            status=status.HTTP_200_OK,
        )


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        sender_id = self.request.query_params.get("sent", None)
        receiver_id = self.request.query_params.get("received", None)
        folder_id = self.request.query_params.get("folder", None)
        queryset = Task.objects.all()
        if sender_id:
            if sender_id == "me":
                queryset = queryset.filter(sender_id=self.request.user)
            else:
                queryset = queryset.filter(sender_id=sender_id)
        if receiver_id:
            if receiver_id == "me":
                queryset = queryset.filter(receiver_id=self.request.user)
            else:
                queryset = queryset.filter(receiver_id=receiver_id)
        if folder_id:
            queryset = queryset.filter(folder_id=folder_id)

        return queryset

    def create(self, request, *args, **kwargs):
        serializer = TaskSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        task = serializer.save(sender_id=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@permission_classes([AllowAny])
def signout_view(request):
    logout(request)
    return JsonResponse(
        data={"role": "none"},
        status=status.HTTP_200_OK,
    )
