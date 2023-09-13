from django.contrib.auth.hashers import check_password
from rest_framework import serializers

from .models import Company, CustomUser, Folder, Comment, Task, Relation


class SignUpSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(write_only=True)
    company_password = serializers.CharField(write_only=True)
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = (
            "id",
            "username",
            "password1",
            "password2",
            "email",
            "position_id",
            "company_name",
            "company_password",
        )

    def validate(self, data):
        if data["password1"] != data["password2"]:
            raise serializers.ValidationError({"password2": "Passwords do not match."})

        company_name = data["company_name"]
        company_password = data["company_password"]
        try:
            company = Company.objects.get(name=company_name)
        except Company.DoesNotExist:
            raise serializers.ValidationError(
                {"company_name": "Company does not exist."}
            )

        if not check_password(company_password, company.password):
            raise serializers.ValidationError(
                {"company_password": "Company password does not match."}
            )

        # password, company フィールドを作成
        data["password"] = data["password1"]
        data["company_id"] = company
        return data

    def create(self, validated_data):
        # CustomUser オブジェクトの作成に不必要なフィールドを削除
        validated_data.pop("company_name", None)
        validated_data.pop("company_password", None)
        validated_data.pop("password1", None)
        validated_data.pop("password2", None)
        user = CustomUser.objects.create(**validated_data)
        return user


class FolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Folder
        fields = (
            "id",
            # sender_id は request.user.id にするため、ここでは取得しない
            "receiver_id",
            "title",
            "vision",
            "status",
        )


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = (
            "id",
            "task_id",
            "content",
        )


class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()

    class Meta:
        model = CustomUser
        fields = ["email", "password"]


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = (
            "receiver_id",
            "folder_id",
            "title",
            "content",
            "memo",
            "status",
            "deadline",
        )


class LogoutSerializer(serializers.ModelSerializer):
    pass


class RelationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            "id",
            "username",
            "email",
            "company_id",
            "position_id",
            "count_comment",
            "count_emotions",
            "date_joined",
        ]


class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        exclude = ("password",)
