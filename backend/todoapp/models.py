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
        unique=True,
    )

    def __str__(self):
        return self.position


class Company(models.Model):
    name = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        # オブジェクトがまだデータベースに保存されていない場合、パスワードをハッシュ化する
        if not self.pk:
            self.password = make_password(self.password)
        super().save(*args, **kwargs)


class CustomUser(AbstractUser):
    company_id = models.ForeignKey(Company, on_delete=models.CASCADE)
    position_id = models.ForeignKey(Position, on_delete=models.CASCADE)
    count_comment = models.IntegerField(default=0)
    count_emotions = models.IntegerField(default=0)
    date_joined = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"username: {self.username}, company: {self.company_id.name}, position: {self.position_id.position}"


class Folder(models.Model):
    sender_id = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="folder_sender_id"
    )
    receiver_id = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="folder_receiver_id"
    )
    title = models.CharField(max_length=100)
    vision = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"title: {self.title}, vision: {self.vision}"


class Task(models.Model):
    sender_id = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="task_sender_id"
    )
    receiver_id = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="task_receiver_id"
    )
    folder_id = models.ForeignKey(Folder, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    # タスクの内容
    content = models.TextField()
    # タスクを割り当てられた人が個人的に記入できるメモ
    memo = models.TextField(null=True, blank=True)
    is_finished = models.BooleanField(default=False)
    deadline = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    finished_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"title: {self.title}, content: {self.content}"


class Emotion(models.Model):
    # Enum で Emotion を 6 段階にする
    class EmotionChoices(models.TextChoices):
        EMOTION_GOOD = "good"
        EMOTION_EXCELLENT = "excellent"
        EMOTION_SAD = "sad"
        EMOTION_EYES = "eyes"
        EMOTION_CHECK = "check"
        EMOTION_CONGRATS = "congrats"

    sender_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    task_id = models.ForeignKey(Task, on_delete=models.CASCADE)
    emotion_type = models.CharField(
        max_length=20,
        choices=EmotionChoices.choices,
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"task_id: {self.task_id}, type: {self.type}"


class Comment(models.Model):
    task_id = models.ForeignKey(Task, on_delete=models.CASCADE)
    sender_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    content = models.CharField(max_length=400)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"task_id: {self.task_id}, content: {self.content}"
