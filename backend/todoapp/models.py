from django.db import models
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import AbstractUser


class Position(models.Model):
    # Enum のように 3 段階にする
    # https://qiita.com/shun198/items/5e29f512139078c63efd
    class PositionChoices(models.TextChoices):
        POSITION_NEW_GRADUATE = "new_graduate"
        POSITION_DIRECT_SUPERVISOR = "direct_supervisor"
        POSITION_MANAGER = "manager"

    position = models.CharField(
        max_length=20,
        choices=PositionChoices.choices,
        default=PositionChoices.POSITION_NEW_GRADUATE,
    )

    def __str__(self):
        return self.position


class Company(models.Model):
    name = models.CharField(max_length=100)
    password = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        # オブジェクトがまだデータベースに保存されていない場合、パスワードをハッシュ化する
        if not self.pk:
            self.password = make_password(self.password)
        super().save(*args, **kwargs)


class CustomUser(AbstractUser):
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    position = models.ForeignKey(Position, on_delete=models.CASCADE)
    count_comment = models.IntegerField(default=0)
    count_emotions = models.IntegerField(default=0)
    date_joined = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.username} [{self.company}, {self.position}]"


class Folder(models.Model):
    pass


class Task(models.Model):
    pass


class Emotion(models.Model):
    pass


class Comment(models.Model):
    pass