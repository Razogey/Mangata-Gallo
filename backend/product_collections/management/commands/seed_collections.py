from django.core.management.base import BaseCommand

from product_collections.models import (
    Collection,
    CollectionHighlight,
    CollectionImage,
)


COLLECTIONS = [
    {
        "slug": "engagement",
        "title": "Engagement Rings",
        "description": (
            "Discover elegant engagement rings crafted to celebrate "
            "the beginning of your forever."
        ),
        "details": (
            "Our engagement collection brings together timeless designs "
            "created to mark one of life's most meaningful moments. Each "
            "piece combines elegant proportions, refined details, and "
            "lasting beauty."
        ),
        "image_url": "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=1200",
        "alt_text": "Elegant diamond engagement ring",
        "highlights": [
            "Timeless diamond designs",
            "Elegant and refined craftsmanship",
            "Created for meaningful moments",
        ],
    },
    {
        "slug": "wedding",
        "title": "Wedding Jewelry",
        "description": (
            "Explore timeless pieces designed to complement every "
            "unforgettable moment of your wedding day."
        ),
        "details": (
            "The wedding collection is designed to celebrate the journey "
            "of two people coming together. From classic bands to refined "
            "jewelry pieces, each design adds an elegant touch to your "
            "special day."
        ),
        "image_url": "https://images.unsplash.com/photo-1619893454156-26a705ac9eb5?auto=format&fit=crop&q=80&w=1200",
        "alt_text": "Elegant wedding rings",
        "highlights": [
            "Classic wedding bands",
            "Elegant designs for special occasions",
            "Crafted to celebrate lasting commitment",
        ],
    },
    {
        "slug": "luxury",
        "title": "Luxury Jewelry",
        "description": (
            "Discover signature designs where classic elegance meets "
            "exceptional craftsmanship."
        ),
        "details": (
            "Our luxury collection reflects the signature style of "
            "Mangata & Gallo. Sophisticated designs, timeless forms, "
            "and carefully considered details create pieces made to "
            "be treasured."
        ),
        "image_url": "https://images.unsplash.com/photo-1722372223491-63fbe94fae9b?auto=format&fit=crop&q=80&w=1200",
        "alt_text": "Luxury diamond jewelry",
        "highlights": [
            "Signature Mangata & Gallo designs",
            "Classic elegance with modern sophistication",
            "Exceptional attention to detail",
        ],
    },
    {
        "slug": "diamond",
        "title": "Diamond Jewelry",
        "description": (
            "Explore brilliant diamond pieces designed to capture "
            "light and create lasting impressions."
        ),
        "details": (
            "The diamond collection brings together refined pieces "
            "designed around the natural brilliance of diamonds, "
            "combining sophistication with timeless style."
        ),
        "image_url": "https://images.unsplash.com/photo-1679973298744-22e30ebdac21?auto=format&fit=crop&q=80&w=1200",
        "alt_text": "Elegant diamond jewelry",
        "highlights": [
            "Brilliant diamond designs",
            "Timeless elegance",
            "Refined craftsmanship",
        ],
    },
    {
        "slug": "gold",
        "title": "Gold Jewelry",
        "description": (
            "Discover beautifully crafted gold jewelry designed to "
            "bring warmth and elegance to every occasion."
        ),
        "details": (
            "Our gold collection celebrates the enduring beauty of gold "
            "through carefully crafted designs that balance classic "
            "style with modern sophistication."
        ),
        "image_url": "https://images.unsplash.com/photo-1679973298744-22e30ebdac21?auto=format&fit=crop&q=80&w=1200",
        "alt_text": "Elegant gold jewelry",
        "highlights": [
            "Classic gold designs",
            "Warm and timeless elegance",
            "Crafted for lasting beauty",
        ],
    },
    {
        "slug": "everyday-elegance",
        "title": "Everyday Elegance",
        "description": (
            "Discover refined jewelry designed to add a touch of elegance "
            "to your everyday moments."
        ),
        "details": (
            "Everyday Elegance features versatile pieces designed to "
            "fit naturally into your daily style while maintaining the "
            "refined character of Mangata & Gallo."
        ),
        "image_url": "https://images.unsplash.com/photo-1650455221359-3aebf920bcc5?auto=format&fit=crop&q=80&w=1200",
        "alt_text": "Elegant everyday jewelry",
        "highlights": [
            "Versatile everyday designs",
            "Subtle and refined details",
            "Easy to style and wear",
        ],
    },
]


class Command(BaseCommand):
    help = "Seed the six Mangata & Gallo collections."

    def handle(self, *args, **options):

        Collection.objects.exclude(slug__in=[data["slug"] for data in COLLECTIONS]).delete()

        for data in COLLECTIONS:
            collection, created = Collection.objects.update_or_create(
                slug=data["slug"],
                defaults={
                    "title": data["title"],
                    "description": data["description"],
                    "details": data["details"],
                },
            )

            collection.images.all().delete()
            collection.highlights.all().delete()

            CollectionImage.objects.create(
                collection=collection,
                image_url=data["image_url"],
                alt_text=data["alt_text"],
                sort_order=0,
                is_primary=True,
            )

            CollectionHighlight.objects.bulk_create(
                [
                    CollectionHighlight(
                        collection=collection,
                        text=text,
                        sort_order=index,
                    )
                    for index, text in enumerate(data["highlights"])
                ]
            )

            action = "Created" if created else "Updated"
            self.stdout.write(
                self.style.SUCCESS(
                    f"{action}: {collection.title}"
                )
            )

        self.stdout.write(
            self.style.SUCCESS(
                "Successfully seeded 6 collections."
            )
        )