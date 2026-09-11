from rest_framework.routers import DefaultRouter

from .views import CollectionHighlightViewSet, CollectionViewSet


router = DefaultRouter()

router.register(
    "highlights",
    CollectionHighlightViewSet,
    basename="collection-highlight",
)

router.register(
    "",
    CollectionViewSet,
    basename="collection",
)

urlpatterns = router.urls