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
    ordering_fields = ['pub_date']
    ordering = ['-pub_date']  

    def perform_create(self, serializer): 
        serializer.save(author=self.request.user)

    def list(self, request, *args, **kwargs):
        posts = self.queryset.filter(author=request.user)
        serializer = self.get_serializer(posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
            
    def retrieve(self, request, *args, **kwargs):
        # Get the post by ID
        post = self.get_object()

        if request.user == post.author:
            serializer = self.get_serializer(post)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            raise PermissionDenied("You are not the owner of this post.")

    def update(self, request, pk=None):
        post = self.get_object()
        serializer = self.serializer_class(post, data=request.data)

        if self.request.user == post.author:
            serializer.is_valid(raise_exception=True)  
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            raise PermissionDenied("You are not the owner of this post.")

    def destroy(self, request, pk=None):
        post = self.get_object()
        if self.request.user == post.author:
            post.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            raise PermissionDenied("You are not the owner of this post.")


class CommentDetailView(viewsets.ModelViewSet): 
    serializer_class = CommentSerializer 
    queryset = Comment.objects.all() 
