from django.shortcuts import render
from rest_framework import viewsets 
from .serializers import PostSerializer, CommentSerializer, TagSerializer
from .models import Post, Comment, Tag
from django.core.exceptions import PermissionDenied
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.filters import OrderingFilter

User = get_user_model()


# Views for post blog: 
class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [IsAuthenticated]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

from django.shortcuts import get_object_or_404

class PostDetailView(viewsets.ModelViewSet): 
    serializer_class = PostSerializer 
    queryset = Post.objects.all() 
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [IsAuthenticated]

    filter_backends = [OrderingFilter]
    ordering_fields = ['pub_date']  # Specify the fields you want to allow ordering by
    ordering = ['-pub_date']  # Default ordering

    def perform_create(self, serializer): 
        serializer.save(author=self.request.user)

    def list(self, request, *args, **kwargs):
        # Filter posts to include only those owned by the current user
        posts = self.queryset.filter(author=request.user)
        serializer = self.get_serializer(posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
            
    def retrieve(self, request, *args, **kwargs):
        # Get the post by ID
        post = self.get_object()

        # Ensure the user retrieving the post is the owner
        if request.user == post.author:
            serializer = self.get_serializer(post)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            # Handle unauthorized retrieval (e.g., return 403 Forbidden)
            raise PermissionDenied("You are not the owner of this post.")

    def update(self, request, pk=None):
        post = self.get_object()  # Get the post instance based on the primary key
        serializer = self.serializer_class(post, data=request.data)

        # Ensure the user updating the post is the owner
        if self.request.user == post.author:
            serializer.is_valid(raise_exception=True)  # Validate the serializer
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            # Handle unauthorized update (e.g., return 403 Forbidden)
            raise PermissionDenied("You are not the owner of this post.")

    def destroy(self, request, pk=None):
        post = self.get_object()
        # Ensure the user deleting the post is the owner
        if self.request.user == post.author:
            post.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            # Handle unauthorized delete (e.g., return 403 Forbidden)
            raise PermissionDenied("You are not the owner of this post.")


class CommentDetailView(viewsets.ModelViewSet): 
    serializer_class = CommentSerializer 
    queryset = Comment.objects.all() 
