from accounts.permissions import IsStaffOrAdmin
from rest_framework.exceptions import MethodNotAllowed
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet

from .models import Product, ProductImage
from .serializers import ProductImageSerializer, ProductSerializer


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
