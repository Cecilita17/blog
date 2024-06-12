from rest_framework import serializers 
from .models import Post, Comment, Tag

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']

class PostSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)
    tags = serializers.PrimaryKeyRelatedField(queryset=Tag.objects.all(), many=True, required=False)

    class Meta:
        model = Post
        fields = '__all__'  # '__all__' is a string, not a tuple

    def create(self, validated_data):
        tags_data = validated_data.pop('tags', [])
        post = Post.objects.create(**validated_data)
        
        for tag_data in tags_data:  # Corrected variable name
            tag, created = Tag.objects.get_or_create(name=tag_data['name'])
            post.tags.add(tag)

        return post

    def update(self, instance, validated_data):
        tags_data = validated_data.pop('tags', [])
        instance.title = validated_data.get('title', instance.title)
        instance.text_body = validated_data.get('text_body', instance.text_body)
        instance.image = validated_data.get('image', instance.image)
        instance.save()

        instance.tags.clear()  # Corrected method name
        for tag_data in tags_data:  # Corrected variable name
            tag, created = Tag.objects.get_or_create(name=tag_data['name'])
            instance.tags.add(tag)

        return instance

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'  # '__all__' is a string, not a tuple
