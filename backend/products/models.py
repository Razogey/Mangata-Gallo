from django.db import models


class Product(models.Model):
    slug = models.SlugField(max_length=200, unique=True)
    name = models.CharField(max_length=200)
    description = models.TextField()

    category = models.ForeignKey(
        "categories.Category",
        on_delete=models.PROTECT,
        related_name="products",
    )

    collection = models.ForeignKey(
        "product_collections.Collection",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="products",
    )

    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "products"
        ordering = ["name"]  # noqa: RUF012

    def __str__(self):
        return self.name
    

class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="images")
    image_url = models.URLField(max_length=500)
    alt_text = models.CharField(max_length=255, blank=True, null=True)
    sort_order = models.IntegerField(default=0)
    is_primary = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "product_images"
        ordering = ["sort_order", "id"]  # noqa: RUF012

    def __str__(self):
        return self.alt_text or f"Image for: {self.product.name}"
    