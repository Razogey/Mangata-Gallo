from rest_framework import serializers

from .models import OptionType, Product, ProductImage, ProductVariant


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = [  # noqa: RUF012
            "id",
            "product",
            "image_url",
            "alt_text",
            "sort_order",
            "is_primary",
            "created_at",
        ]

        read_only_fields = [  # noqa: RUF012
            "id",
            "created_at"
        ]

    def validate(self, attrs):
        product = attrs.get("product", getattr(self.instance, "product", None))
        is_primary = attrs.get("is_primary", getattr(self.instance, "is_primary", False))

        if is_primary:
            queryset = ProductImage.objects.filter(product=product, is_primary=True)


            if self.instance:
                queryset = queryset.exclude(pk=self.instance.pk)

            if queryset.exists():
                raise serializers.ValidationError({"is_primary": ("This product already has a primary image.")})

        return attrs


class ProductVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVariant
        fields = [
            "id",
            "product",
            "sku",
            "price",
            "stock_quantity",
            "is_active",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "created_at",
            "updated_at",
        ]

    def validate_price(self, value):
        if value < 0:
            raise serializers.ValidationError(
                "Price cannot be negative."
            )
        return value


class OptionTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = OptionType
        fields = [
            "id",
            "name",
            "created_at"
        ]

        read_only_fields = [
            "id",
            "created_at"
        ]


class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    variants = ProductVariantSerializer(many=True, read_only=True)
    class Meta:
        model = Product
        fields = [  # noqa: RUF012
            "id",
            "slug",
            "name",
            "description",
            "category",
            "collection",
            "is_active",
            "images",
            "variants",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [  # noqa: RUF012
            "id",
            "created_at",
            "updated_at",
        ]
