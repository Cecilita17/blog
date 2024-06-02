from rest_framework import serializers 
from .models import Post, Comment, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description']

class PostSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)
    categories = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), many=True)
    class Meta:
        model = Post
        fields = ('__all__')

    def create(self, validated_data):
        categories_data = validated_data.pop('categories', [])
        post = Post.objects.create(**validated_data)
        
        for category in categories_data:
            post.categories.add(category)

        return post

    def update(self, instance, validated_data):
        categories_data = validated_data.pop('categories')
        instance.title = validated_data.get('title', instance.title)
        instance.text_body = validated_data.get('text_body', instance.text_body)
        instance.image = validated_data.get('image', instance.image)
        instance.save()

        instance.categories.clear()
        for category_data in categories_data:
            category, created = Category.objects.get_or_create(name=category_data['name'])
            instance.categories.add(category)

        return instance

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('__all__')
