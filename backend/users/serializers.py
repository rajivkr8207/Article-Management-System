from rest_framework import serializers
from .models import User, CustomUser
from django.contrib.auth.models import User
   
class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data['email']

        )
        user.set_password(validated_data['password'])  # Hash the password
        user.save()
        return user


class ProfileSerializer(serializers.ModelSerializer):
    bio = serializers.CharField(required=False, allow_blank=True) 
    occupation = serializers.CharField(required=False, allow_blank=True) 
    phone_number = serializers.CharField(required=False, allow_blank=True) 
    image = serializers.ImageField(required=False, allow_null=True)
    class Meta:
        model = CustomUser
        fields = ['bio', 'occupation','image','phone_number', 'updated_at']

class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()
    class Meta:
        model = User
        fields = ['id','username', 'email', 'profile']
    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', None)
        user = super().update(instance, validated_data)
        if profile_data:
            profile, created = CustomUser.objects.get_or_create(user=user)
            profile.bio = profile_data.get('bio', profile.bio)
            profile.occupation = profile_data.get('occupation', profile.occupation)
            profile.phone_number = profile_data.get('phone_number', profile.phone_number)
            profile.image = profile_data.get('image', profile.image)
            profile.save()

        return user

