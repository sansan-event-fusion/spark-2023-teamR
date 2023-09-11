from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from .serializers import SignUpSerializer, LoginSerializer
from django.contrib.auth import authenticate, login, logout
from django.http import  JsonResponse


@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def signup_view(request):
    if request.method == 'GET':
        return Response({"message": "Signup page"}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        serializer = SignUpSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def signin_view(request):
    # todo request bodyをemailとpasswordに限定できる？
    # todo パスワードハッシュ化して保存を確認
    serializer = LoginSerializer(data=request.data)
    is_valid=serializer.is_valid(raise_exception=True)
    email = serializer.validated_data.get("email")
    password = serializer.validated_data.get("password")
    user = authenticate(request, email=email, password=password)
    if not user:
        return JsonResponse(
            data={"msg": "either email or password is incorrect"},
            status=status.HTTP_400_BAD_REQUEST,
        )
    else:
        login(request, user)
        #ここは何を返すべき？
        # 公式によると↓
        # Redirect to a success page.
        return JsonResponse(data={"role": "hoge"})


@permission_classes([AllowAny])
def signout_view(request):
    logout(request)
    return JsonResponse(data={"role": "none"})