from rest_framework.routers import DefaultRouter

from .views import ProductImageViewSet, ProductVariantViewSet, ProductViewSet

router = DefaultRouter()

router.register("images", ProductImageViewSet, basename="product-image")
router.register("variants", ProductVariantViewSet, basename="product-variant")
router.register("", ProductViewSet, basename="product")

urlpatterns = router.urls