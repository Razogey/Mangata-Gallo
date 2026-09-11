from accounts.permissions import IsStaffOrAdmin
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet

from .models import Collection, CollectionHighlight
from .serializers import (
    CollectionHighlightSerializer,
    CollectionSerializer,
)


class CollectionViewSet(ModelViewSet):
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [AllowAny()]

        return [IsStaffOrAdmin()]


class CollectionHighlightViewSet(ModelViewSet):
    queryset = CollectionHighlight.objects.select_related("collection").all()
    serializer_class = CollectionHighlightSerializer

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [AllowAny()]

        return [IsStaffOrAdmin()]