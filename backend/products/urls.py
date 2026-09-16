from rest_framework.routers import DefaultRouter

from .views import (
    OptionTypeViewSet,
    OptionValueViewSet,
    ProductImageViewSet,
    ProductVariantViewSet,
    ProductViewSet,
    VariantOptionViewSet,
)

router = DefaultRouter()

router.register("images", ProductImageViewSet, basename="product-image")
router.register("variants", ProductVariantViewSet, basename="product-variant")
router.register("options", OptionTypeViewSet, basename="option-type")
router.register("values", OptionValueViewSet, basename="option-values")
router.register("variant-options", VariantOptionViewSet, basename="variant-options")
router.register("", ProductViewSet, basename="product")

urlpatterns = router.urls