from rest_framework import serializers

from .models import Collection


class CollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collection
        fields = [
            "id",
            "slug",
            "title",
            "description",
            "details",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "created_at",
            "updated_at",
        ]