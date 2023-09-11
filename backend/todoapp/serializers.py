from rest_framework import serializers
from django.contrib.auth.hashers import check_password
from .models import *


class CustomUserSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(write_only=True)
    company_password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = (
            "id",
            "username",
            "password",
            "email",
            "position_id",
            "company_name",
            "company_password",
        )

    def create(self, validated_data):
        company_name = validated_data.pop("company_name")
        company_password = validated_data.pop("company_password")
        email = validated_data.pop("email")

        try:
            if CustomUser.objects.filter(email=email).exists():
                raise serializers.ValidationError("Email already exists.")

            company = Company.objects.get(name=company_name)
            if not check_password(company_password, company.password):
                raise serializers.ValidationError("Company password does not match.")
            validated_data["company_id"] = company
        except Company.DoesNotExist:
            raise serializers.ValidationError("Company does not exist.")

        user = CustomUser.objects.create(**validated_data)
        return user


class FolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Folder
        fields = (
            "id",
            "sender_id",
            "receiver_id",
            "title",
            "vision",
        )