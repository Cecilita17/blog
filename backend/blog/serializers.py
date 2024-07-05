import json
from rest_framework import serializers
from .models import Post, Tag, Comment

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']

class PostSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)
    tags = serializers.JSONField(required=False)
    
    class Meta:
        model = Post
        fields = '__all__'
        read_only_fields = ['author']

    def to_internal_value(self, data):
        tags_data = data.get('tags')
        if tags_data and isinstance(tags_data, str):
            try:
                data['tags'] = json.loads(tags_data)
            except json.JSONDecodeError:
                raise serializers.ValidationError({"tags": "Invalid JSON format for tags"})
        return super().to_internal_value(data)

    def create(self, validated_data):
        tags_data = validated_data.pop('tags', [])
        post = Post.objects.create(**validated_data)
        
        for tag_data in tags_data:
            tag_id = tag_data.get('id')
            tag_name = tag_data.get('name')
            
            if tag_id:
                tag = Tag.objects.filter(id=tag_id).first()
                if not tag:
                    tag = Tag.objects.create(name=tag_name)
            else:
                tag, _ = Tag.objects.get_or_create(name=tag_name)
            
            post.tags.add(tag)

        return post

    def update(self, instance, validated_data):
        tags_data = validated_data.pop('tags', [])
        instance = super().update(instance, validated_data)
        
        instance.tags.clear()
        for tag_data in tags_data:
            tag_id = tag_data.get('id')
            tag_name = tag_data.get('name')
            
            if tag_id:
                tag = Tag.objects.filter(id=tag_id).first()
                if not tag:
                    tag = Tag.objects.create(name=tag_name)
            else:
                tag, _ = Tag.objects.get_or_create(name=tag_name)
            
            instance.tags.add(tag)

        return instance

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
