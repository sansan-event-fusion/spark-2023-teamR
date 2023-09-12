from django.urls import path
from .views import signup_view, signin_view, signout_view
from rest_framework.routers import DefaultRouter
from .views import FolderViewSet, CommentViewSet

router = DefaultRouter()
router.register(r"folders", FolderViewSet)
router.register(r"comment", CommentViewSet)

urlpatterns = [
    path('signup/', signup_view, name="signup"),
    path("signin/", signin_view, name="signin"),
    path("signout/", signout_view, name="signout")
] + router.urls
