from django.contrib.auth.hashers import check_password
from rest_framework import serializers

from .models import Company, CustomUser


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


class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()

    class Meta:
        model = CustomUser
        fields = ["email", "password"]


class LogoutSerializer(serializers.ModelSerializer):
    pass
