from rest_framework import serializers
from django.contrib.auth.hashers import check_password
from .models import CustomUser, Company


class SignUpSerializer(serializers.ModelSerializer):
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

        try:
            company = Company.objects.get(name=company_name)
        except Company.DoesNotExist:
            raise serializers.ValidationError("Company does not exist.")

        if not check_password(company_password, company.password):
            raise serializers.ValidationError("Company password does not match.")
        validated_data["company_id"] = company

        user = CustomUser.objects.create(**validated_data)
        return user
class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()

    class Meta:
        model = CustomUser
        fields = ["email","password"]

class LogoutSerializer(serializers.ModelSerializer):
    pass