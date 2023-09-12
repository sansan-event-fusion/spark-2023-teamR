from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status, viewsets
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from .serializers import SignUpSerializer, LoginSerializer, FolderSerializer,CommentSerializer
from .models import Folder, Comment, Task


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
        status = self.request.query_params.get("status", None)
        queryset = Folder.objects.all()
        if status:
            queryset = queryset.filter(status=status)
        if query_type == "received":
            queryset = queryset.filter(receiver_id=self.request.user).order_by(
                "-created_at"
            )
        elif query_type == "sent":
            queryset = queryset.filter(sender_id=self.request.user).order_by(
                "-created_at"
            )
        return queryset

    def create(self, request, *args, **kwargs):
        serializer = FolderSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        folder = serializer.save(sender_id=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class CommentViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
    # todo:taskの存在判定もしないといけない

    def get_queryset(self):
        # リクエストパラメータで指定したタスクのコメントのみ返す。
        # 該当するタスクのsender, receiverだけ見えるように
        task_id = self.request.query_params.get('task_id')
        queryset = Comment.objects.all().filter(task_id = task_id).order_by("-created_at")
        task_query= Task.objects.all().filter(id=task_id)
        relate_user_ids = set(task_query.values("sender_id", "receiver_id")[0].values())
        viewer_id=self.request.user.id

        if viewer_id in relate_user_ids:
            return queryset
        else:
            return queryset.filter(task_id=-1) # 該当しないを返したい

    def create(self, request, *args, **kwargs):
        # user が指定したタスクにコメントを残す。
        relate_user_ids = set(queryset.values("sender_id", "receiver_id")[0].values())
        viewer_id=self.request.user.id
        if viewer_id in relate_user_ids:
            serializer = CommentSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            folder = serializer.save(sender_id=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return JsonResponse(
            data={"msg": "you dont have accecc permissions"},
            status=status.HTTP_400_BAD_REQUEST,
        )
        


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
