from rest_framework import serializers  # noqa: I001

from categories.models import Category
from product_collections.models import Collection
from .models import OptionType, Product, ProductImage, ProductVariant, OptionValue, VariantOption


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
        fields = [  # noqa: RUF012
            "id",
            "product",
            "sku",
            "price",
            "stock_quantity",
            "is_active",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [        # noqa: RUF012
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
        fields = [      # noqa: RUF012
            "id",
            "name",
            "created_at"
        ]

        read_only_fields = [        # noqa: RUF012
            "id",
            "created_at"
        ]


class OptionValueSerializer(serializers.ModelSerializer):

    class Meta:
        model = OptionValue
        fields = [      # noqa: RUF012
            "id",
            "option_type",
            "value",
            "created_at"
        ]

        read_only_fields = [        # noqa: RUF012
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


class VariantOptionSerializer(serializers.ModelSerializer):

    class Meta:
        model = VariantOption
        fields = [      # noqa: RUF012
            "id",
            "product_variant", 
            "option_value"
        ]

        read_only_fields = [        # noqa: RUF012
            "id",       
        ]


class VariantOptionReadSerializer(serializers.ModelSerializer):
    type = serializers.CharField(
        source="option_value.option_type.name",
        read_only=True,
    )
    value = serializers.CharField(
        source="option_value.value",
        read_only=True,
    )

    class Meta:
        model = VariantOption
        fields = [  # noqa: RUF012
            "type",
            "value",
        ]


class ProductVariantReadSerializer(serializers.ModelSerializer):
    options = VariantOptionReadSerializer(
        source="variant_options",
        many=True,
        read_only=True,
    )

    class Meta:
        model = ProductVariant
        fields = [  # noqa: RUF012
            "id",
            "sku",
            "price",
            "stock_quantity",
            "is_active",
            "options",
        ]


class CategoryReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = [  # noqa: RUF012
            "id",
            "name",
            "slug",
        ]


class CollectionReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collection
        fields = [  # noqa: RUF012
            "id",
            "title",
            "slug",
        ]


class ProductListSerializer(serializers.ModelSerializer):
    category = CategoryReadSerializer(read_only=True)
    collection = CollectionReadSerializer(read_only=True)
    primary_image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [  # noqa: RUF012
            "id",
            "slug",
            "name",
            "category",
            "collection",
            "primary_image",
            "is_active",
        ]

    def get_primary_image(self, obj):
        image = obj.images.filter(is_primary=True).first()

        if not image:
            return None

        return {
            "image_url": image.image_url,
            "alt_text": image.alt_text,
        }


class ProductDetailSerializer(serializers.ModelSerializer):
    category = CategoryReadSerializer(read_only=True)
    collection = CollectionReadSerializer(read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)
    variants = ProductVariantReadSerializer(many=True, read_only=True)

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