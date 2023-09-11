from django.urls import path, include
from .views import signup_view, FolderViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r"folders", FolderViewSet)

urlpatterns = [
    path('signup/', signup_view, name="signup"),
    path('', include(router.urls)),
]
