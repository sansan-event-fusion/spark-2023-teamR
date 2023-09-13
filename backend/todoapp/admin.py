from django.contrib import admin
from .models import (
    Company,
    CustomUser,
    Position,
    Folder,
    Task,
    Emotion,
    Comment,
    Relation,
)

admin.site.register(Company)
admin.site.register(CustomUser)
admin.site.register(Position)
admin.site.register(Folder)
admin.site.register(Task)
admin.site.register(Emotion)
admin.site.register(Comment)
admin.site.register(Relation)
