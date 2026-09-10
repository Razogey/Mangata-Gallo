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
        ordering = ["name"]

    def __str__(self):
        return self.name