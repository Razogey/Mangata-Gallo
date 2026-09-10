from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet

from accounts.permissions import IsStaffOrAdmin

from .models import Collection
from .serializers import CollectionSerializer


class CollectionViewSet(ModelViewSet):
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [AllowAny()]

        return [IsStaffOrAdmin()]