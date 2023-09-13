from django.urls import path
from .views import signup_view, signin_view, signout_view, get_subordinates
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, FolderViewSet

router = DefaultRouter()
router.register(r"task", TaskViewSet)
router.register(r"folders", FolderViewSet)

urlpatterns = [
    path("signup/", signup_view, name="signup"),
    path("signin/", signin_view, name="signin"),
    path("signout/", signout_view, name="signout"),
    path("get_subordinates/", get_subordinates, name="get_subordinates"),
] + router.urls
