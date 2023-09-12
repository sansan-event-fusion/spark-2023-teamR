from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status, viewsets
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from .serializers import SignUpSerializer, LoginSerializer, FolderSerializer
from .models import Folder


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


class FolderViewSet(viewsets.ModelViewSet):
    queryset = Folder.objects.all()
    serializer_class = FolderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        query_type = self.request.query_params.get("type", None)
        if query_type == "received":
            return Folder.objects.filter(receiver_id=self.request.user).order_by(
                "-created_at"
            )
        elif query_type == "sent":
            return Folder.objects.filter(sender_id=self.request.user).order_by(
                "-created_at"
            )
        return Folder.objects.none()

    def create(self, request, *args, **kwargs):
        serializer = FolderSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        folder = serializer.save(sender_id=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


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
        token, created = Token.objects.get_or_create(user=user)

        return JsonResponse(
            data={"url": "redirect to succcess page", "token": token.key},
            status=status.HTTP_200_OK,
        )


@permission_classes([AllowAny])
def signout_view(request):
    logout(request)
    return JsonResponse(
        data={"role": "none"},
        status=status.HTTP_200_OK,
    )
