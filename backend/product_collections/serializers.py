from rest_framework import serializers

from .models import Collection, CollectionHighlight, CollectionImage


class CollectionImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CollectionImage
        fields = [  # noqa: RUF012
            "id",
            "image_url",
            "alt_text",
            "sort_order",
            "is_primary",
            "created_at",
        ]
        read_only_fields = [  # noqa: RUF012
            "id",
            "created_at",
        ]


class CollectionSerializer(serializers.ModelSerializer):
    images = CollectionImageSerializer(many=True, read_only=True)

    class Meta:
        model = Collection
        fields = [  # noqa: RUF012
            "id",
            "slug",
            "title",
            "description",
            "details",
            "images",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [  # noqa: RUF012
            "id",
            "created_at",
            "updated_at",
        ]


class CollectionHighlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = CollectionHighlight
        fields = [  # noqa: RUF012
            "id",
            "collection",
            "text",
            "sort_order",
            "created_at",
        ]
        read_only_fields = [  # noqa: RUF012
            "id",
            "created_at",
        ]