from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Article(models.Model):
    CATEGORY_CHOICES = [
        ('general', 'General'),
        ('business', 'Business'),
        ('technology', 'Technology'),
        ('health', 'Health'),
        ('science', 'Science'),
        ('sports', 'Sports'),
        ('entertainment', 'Entertainment'),
    ]
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    content = models.TextField()
    photo = models.ImageField(upload_to='Article_photo', blank=True, null=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='general')
    created_at = models.DateTimeField(auto_now_add=True, null=True)  # Tracks creation time
    updated_at = models.DateTimeField(auto_now=True, null=True)  # Tracks update time



    def __str__(self) -> str:
        return f'News of {self.author}--{self.title}'