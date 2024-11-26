from rest_framework import serializers
from .models import *
from users.serializers import UserSerializer


class ArticleSerializers(serializers.ModelSerializer):
    username = serializers.CharField(source='author.username', read_only=True)
    author = serializers.PrimaryKeyRelatedField(read_only=True)  # Make author read-only

    class Meta:
        model = Article
        fields = ['id', 'title', 'content', 'category','photo', 'username', 'author', 'created_at', 'updated_at']

    def validate_title(self, value):
        if not value or value.strip() == "":
            raise serializers.ValidationError("Title cannot be blank.")
        return value
