from django.urls import path
from . import views
from django.urls import path

urlpatterns = [
    path('post/<int:pk>/', views.PostDetailView.as_view({'get': 'list', 'post': 'create'}), name='post-detail'),
    path('comment/<int:pk>/', views.CommentDetailView.as_view({'get': 'list', 'post': 'create'}), name='comment-detail'),
    
]

# here youre only creating the /id part of the url