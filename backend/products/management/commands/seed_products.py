from django.core.management.base import BaseCommand
from django.db import transaction

from categories.models import Category
from product_collections.models import Collection
from products.models import (
    OptionType,
    OptionValue,
    Product,
    ProductImage,
    ProductVariant,
    VariantOption,
)


CATEGORIES = [
    {
        "slug": "rings",
        "name": "Rings",
        "description": "Elegant rings designed for meaningful moments.",
    },
    {
        "slug": "necklaces",
        "name": "Necklaces",
        "description": "Timeless necklaces crafted to complement every style.",
    },
    {
        "slug": "earrings",
        "name": "Earrings",
        "description": "Refined earrings for everyday elegance and special occasions.",
    },
    {
        "slug": "bracelets",
        "name": "Bracelets",
        "description": "Beautiful bracelets combining classic design with modern style.",
    },
]


OPTIONS = {
    "Metal": ["Gold", "Silver", "Platinum"],
    "Size": ["6", "7", "8", "9"],
}


PRODUCTS = [
    {
        "slug": "golden-wedding-ring",
        "name": "Golden Wedding Ring",
        "description": (
            "A timeless golden wedding ring crafted with a classic silhouette "
            "for a meaningful and elegant celebration."
        ),
        "category": "rings",
        "collection": "wedding",
        "image_url": (
            "https://images.unsplash.com/photo-1606800052052-a08af7148866"
            "?auto=format&fit=crop&q=80&w=1200"
        ),
        "alt_text": "Golden wedding ring on white fabric",
        "sku": "MNG-RING-WED-001",
        "price": "850.00",
        "stock_quantity": 8,
        "options": {
            "Metal": "Gold",
            "Size": "7",
        },
    },
    {
        "slug": "silver-diamond-necklace",
        "name": "Elegant Silver Diamond Necklace",
        "description": (
            "A refined silver necklace featuring a delicate diamond-inspired "
            "design for sophisticated everyday wear."
        ),
        "category": "necklaces",
        "collection": "diamond",
        "image_url": (
            "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f"
            "?auto=format&fit=crop&q=80&w=1200"
        ),
        "alt_text": "Elegant silver diamond necklace",
        "sku": "MNG-NECK-DIA-001",
        "price": "620.00",
        "stock_quantity": 12,
        "options": {
            "Metal": "Silver",
        },
    },
    {
        "slug": "classic-diamond-engagement-ring",
        "name": "Classic Diamond Engagement Ring",
        "description": (
            "A sophisticated engagement ring inspired by timeless solitaire "
            "designs and understated elegance."
        ),
        "category": "rings",
        "collection": "engagement",
        "image_url": (
            "https://images.unsplash.com/photo-1605100804763-247f67b3557e"
            "?auto=format&fit=crop&q=80&w=1200"
        ),
        "alt_text": "Classic diamond engagement ring",
        "sku": "MNG-RING-ENG-001",
        "price": "1450.00",
        "stock_quantity": 5,
        "options": {
            "Metal": "Platinum",
            "Size": "7",
        },
    },
    {
        "slug": "gold-pearl-earrings",
        "name": "Gold Pearl Earrings",
        "description": (
            "Elegant gold earrings featuring a refined pearl-inspired design "
            "for sophisticated occasions."
        ),
        "category": "earrings",
        "collection": "gold",
        "image_url": (
            "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908"
            "?auto=format&fit=crop&q=80&w=1200"
        ),
        "alt_text": "Elegant gold pearl earrings",
        "sku": "MNG-EAR-GOLD-001",
        "price": "480.00",
        "stock_quantity": 10,
        "options": {
            "Metal": "Gold",
        },
    },
    {
        "slug": "diamond-tennis-bracelet",
        "name": "Diamond Tennis Bracelet",
        "description": (
            "A refined bracelet inspired by the classic tennis bracelet "
            "silhouette, designed to add understated brilliance."
        ),
        "category": "bracelets",
        "collection": "luxury",
        "image_url": (
            "https://images.unsplash.com/photo-1611652022419-a9419f74343d"
            "?auto=format&fit=crop&q=80&w=1200"
        ),
        "alt_text": "Elegant diamond tennis bracelet",
        "sku": "MNG-BRAC-LUX-001",
        "price": "1750.00",
        "stock_quantity": 4,
        "options": {
            "Metal": "Platinum",
        },
    },
    {
        "slug": "minimal-gold-necklace",
        "name": "Minimal Gold Necklace",
        "description": (
            "A delicate gold necklace designed for effortless everyday "
            "elegance and versatile styling."
        ),
        "category": "necklaces",
        "collection": "everyday-elegance",
        "image_url": (
            "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f"
            "?auto=format&fit=crop&q=80&w=1200"
        ),
        "alt_text": "Minimal gold necklace",
        "sku": "MNG-NECK-EVE-001",
        "price": "390.00",
        "stock_quantity": 15,
        "options": {
            "Metal": "Gold",
        },
    },
    {
        "slug": "classic-gold-bracelet",
        "name": "Classic Gold Bracelet",
        "description": (
            "A polished gold bracelet with a timeless profile, designed to "
            "complement both formal and everyday looks."
        ),
        "category": "bracelets",
        "collection": "gold",
        "image_url": (
            "https://images.unsplash.com/photo-1573408301185-9146fe634ad0"
            "?auto=format&fit=crop&q=80&w=1200"
        ),
        "alt_text": "Classic gold bracelet",
        "sku": "MNG-BRAC-GOLD-001",
        "price": "560.00",
        "stock_quantity": 9,
        "options": {
            "Metal": "Gold",
        },
    },
    {
        "slug": "diamond-stud-earrings",
        "name": "Diamond Stud Earrings",
        "description": (
            "Classic diamond stud earrings with a clean and elegant design "
            "for timeless sophistication."
        ),
        "category": "earrings",
        "collection": "diamond",
        "image_url": (
            "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908"
            "?auto=format&fit=crop&q=80&w=1200"
        ),
        "alt_text": "Classic diamond stud earrings",
        "sku": "MNG-EAR-DIA-001",
        "price": "720.00",
        "stock_quantity": 7,
        "options": {
            "Metal": "Platinum",
        },
    },
]


class Command(BaseCommand):
    help = "Clean and seed catalog categories, products, variants, images, and options."

    @transaction.atomic
    def handle(self, *args, **options):

        # ---------------------------------------------------------
        # 1. Categories
        # ---------------------------------------------------------

        self.stdout.write("Cleaning categories...")

        category_slugs = {data["slug"] for data in CATEGORIES}

        Category.objects.exclude(
            slug__in=category_slugs
        ).delete()

        categories = {}

        for data in CATEGORIES:
            category, _ = Category.objects.update_or_create(
                slug=data["slug"],
                defaults={
                    "name": data["name"],
                    "description": data["description"],
                },
            )

            categories[data["slug"]] = category

        # ---------------------------------------------------------
        # 2. Options
        # ---------------------------------------------------------

        self.stdout.write("Cleaning product options...")

        option_type_names = set(OPTIONS.keys())

        OptionType.objects.exclude(
            name__in=option_type_names
        ).delete()

        option_values = {}

        for option_type_name, values in OPTIONS.items():

            option_type, _ = OptionType.objects.update_or_create(
                name=option_type_name
            )

            OptionValue.objects.filter(
                option_type=option_type
            ).exclude(
                value__in=values
            ).delete()

            for value in values:
                option_value, _ = OptionValue.objects.update_or_create(
                    option_type=option_type,
                    value=value,
                )

                option_values[(option_type_name, value)] = option_value

        # ---------------------------------------------------------
        # 3. Products
        # ---------------------------------------------------------

        self.stdout.write("Cleaning products...")

        product_slugs = {data["slug"] for data in PRODUCTS}

        Product.objects.exclude(
            slug__in=product_slugs
        ).delete()

        for data in PRODUCTS:

            category = categories[data["category"]]

            collection = Collection.objects.get(
                slug=data["collection"]
            )

            product, created = Product.objects.update_or_create(
                slug=data["slug"],
                defaults={
                    "name": data["name"],
                    "description": data["description"],
                    "category": category,
                    "collection": collection,
                    "is_active": True,
                },
            )

            # Remove old images for deterministic seed
            product.images.all().delete()

            ProductImage.objects.create(
                product=product,
                image_url=data["image_url"],
                alt_text=data["alt_text"],
                sort_order=0,
                is_primary=True,
            )

            # -----------------------------------------------------
            # Variant
            # -----------------------------------------------------

            variant, _ = ProductVariant.objects.update_or_create(
                sku=data["sku"],
                defaults={
                    "product": product,
                    "price": data["price"],
                    "stock_quantity": data["stock_quantity"],
                    "is_active": True,
                },
            )

            # Remove extra variants belonging to this product
            ProductVariant.objects.filter(
                product=product
            ).exclude(
                sku=data["sku"]
            ).delete()

            # Remove old option relationships
            variant.variant_options.all().delete()

            for option_type_name, value in data["options"].items():

                option_value = option_values[
                    (option_type_name, value)
                ]

                VariantOption.objects.create(
                    product_variant=variant,
                    option_value=option_value,
                )

            action = "Created" if created else "Updated"

            self.stdout.write(
                self.style.SUCCESS(
                    f"{action}: {product.name}"
                )
            )

        self.stdout.write("")
        self.stdout.write(
            self.style.SUCCESS(
                f"Successfully seeded {len(PRODUCTS)} products."
            )
        )