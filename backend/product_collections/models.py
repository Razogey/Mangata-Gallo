from django.db import models


class Collection(models.Model):
    slug = models.SlugField(max_length=255, unique=True)
    title = models.CharField(max_length=255)
    description = models.TextField()
    details = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "collections"
        ordering = ["title"]

    def __str__(self):
        return self.title


class CollectionImage(models.Model):
    collection = models.ForeignKey(
        Collection,
        on_delete=models.CASCADE,
        related_name="images",
    )
    image_url = models.URLField(max_length=1000)
    alt_text = models.CharField(max_length=255, blank=True)
    sort_order = models.IntegerField(default=0)
    is_primary = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "collection_images"
        ordering = ["sort_order", "id"]

    def __str__(self):
        return self.alt_text or f"Image for {self.collection.title}"


class CollectionHighlight(models.Model):
    collection = models.ForeignKey(
        Collection,
        on_delete=models.CASCADE,
        related_name="highlights",
    )
    text = models.TextField()
    sort_order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "collection_highlights"
        ordering = ["sort_order", "id"]

    def __str__(self):
        return self.text