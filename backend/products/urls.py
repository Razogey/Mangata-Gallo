from rest_framework.routers import DefaultRouter

from .views import ProductImageViewSet, ProductViewSet

router = DefaultRouter()
router.register("images", ProductImageViewSet, basename="product-image")
router.register("", ProductViewSet, basename="product")

urlpatterns = router.urls