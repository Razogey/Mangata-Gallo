from accounts.permissions import IsStaffOrAdmin
from drf_spectacular.utils import OpenApiResponse, extend_schema
from rest_framework.exceptions import MethodNotAllowed
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet

from .models import Product, ProductImage, ProductVariant
from .serializers import (
    ProductImageSerializer,
    ProductSerializer,
    ProductVariantSerializer,
)


class ProductViewSet(ModelViewSet):
    queryset = Product.objects.select_related(
        "category",
        "collection",
    ).all()
    serializer_class = ProductSerializer

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [AllowAny()]

        return [IsStaffOrAdmin()]

    def destroy(self, request, *args, **kwargs):
        raise MethodNotAllowed("DELETE")


class ProductImageViewSet(ModelViewSet):
    queryset = ProductImage.objects.select_related("product").all()
    serializer_class = ProductImageSerializer

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [AllowAny()]

        return [IsStaffOrAdmin()]

    @extend_schema(
        responses={
            201: ProductImageSerializer,
            400: OpenApiResponse(
                description="Product already has a primary image."
            ),
        }
    )
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)


class ProductVariantViewSet(ModelViewSet):
    queryset = ProductVariant.objects.select_related("product").all()
    serializer_class = ProductVariantSerializer

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [AllowAny()]

        return [IsStaffOrAdmin()]