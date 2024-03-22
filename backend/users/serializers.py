from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer as BaseTokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User


def clean_email(value):
    if 'admin' in value:
        raise serializers.ValidationError('admin cant be in email')


class UserRegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('phone_number', 'email', 'full_name', 'password', 'password2')
        extra_kwargs = {
            'password': {'write_only':True},
            'email': {'validators': (clean_email,)}
        }
    
    def create(self, validated_data):
        del validated_data['password2']
        return User.objects.create_user(**validated_data)

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError('passwords must match')
        return data

    def validate_username(self, value):
        if value == 'admin':
            raise serializers.ValidationError('username cant be `admin`')
        return value


class UserSerializerWithToken(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'phone_number', 'email', 'name', 'is_active', 'isAdmin', 'token']


    def get_name(self, obj):
        name = obj.full_name
        if name == '':
            name = obj.email

        return name

    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_token(self, obj):
        refresh = RefreshToken.for_user(obj)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }

    
class TokenObtainPairSerializer(BaseTokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for key, value in serializer.items():
            data[key] = value

        return data


class OTPVerificationSerializer(serializers.Serializer):
    code = serializers.CharField(max_length=4)
    phone = serializers.CharField(max_length=11)
