from rest_framework import serializers
from django.contrib.auth.hashers import make_password, check_password
from .models import CustomUser, Company


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

    def validate_password(self, value: str) -> str:
        return make_password(value)

    def create(self, validated_data):
        company_name = validated_data.pop("company_name")
        company_password = validated_data.pop("company_password")

        try:
            company = Company.objects.get(name=company_name)
            if not check_password(company_password, company.password):
                raise serializers.ValidationError("Company password does not match.")
            validated_data["company_id"] = company
        except Company.DoesNotExist:
            raise serializers.ValidationError("Company does not exist.")

        user = CustomUser.objects.create(**validated_data)
        return user
