# Mangata & Gallo — Database Design Specification

**Project:** Mangata & Gallo — Luxury Jewelry E-Commerce Platform
**Document Type:** Database Design Specification (Source of Truth)
**Database Engine:** PostgreSQL
**ORM:** Prisma
**Backend:** Node.js / Express.js
**API Style:** REST
**Status:** Design phase — no Prisma schema, SQL, or migrations included

---

## 1. Purpose and Scope

This document defines the complete data model for the Mangata & Gallo e-commerce
platform. It is intended to serve as the **authoritative reference** for the later
implementation of the Prisma schema. It intentionally does **not** contain Prisma
model definitions, SQL `CREATE TABLE` statements, or migration files — it is a
design-level specification only.

The platform must support:

- User registration and login (local + Google OAuth)
- User addresses
- Product catalog (collections, categories, products, images, variants, options)
- Shopping cart
- Wishlist
- Orders
- Product reviews
- Future payment integration
- Future admin functionality

The current schema consists of **19 tables**, grouped into four functional domains:

| Domain | Tables |
|---|---|
| Authentication & Users | `users`, `auth_accounts`, `addresses` |
| Catalog | `collections`, `collection_highlights`, `categories`, `products`, `product_images`, `product_variants`, `option_types`, `option_values`, `variant_options` |
| Shopping | `carts`, `cart_items`, `wishlists`, `wishlist_items` |
| Orders & Reviews | `orders`, `order_items`, `reviews` |

Payments are explicitly deferred to a future extension (see Section 9).

---

## 2. Table Specifications

### 2.1 `users`

**Purpose:** Stores application users and their basic account information.

| Column | Type | Null | Constraints | Description |
|---|---|---|---|---|
| id | BIGINT | No | PK | User identifier |
| first_name | VARCHAR(100) | No | | First name |
| last_name | VARCHAR(100) | No | | Last name |
| email | VARCHAR(255) | No | UNIQUE | User email |
| password_hash | VARCHAR(255) | Yes | | Hashed password for local auth |
| role | ENUM | No | DEFAULT `CUSTOMER` | User role (`CUSTOMER`, `ADMIN`) |
| is_active | BOOLEAN | No | DEFAULT `true` | Account status |
| created_at | TIMESTAMP | No | | Creation timestamp |
| updated_at | TIMESTAMP | No | | Last update timestamp |

**Design notes:**
- `password_hash` is nullable because users who register exclusively via Google
  OAuth have no local credential.
- Plaintext passwords must never be stored under any circumstance; only a strong,
  salted hash (e.g. bcrypt/argon2) is persisted.

**Relationships:**
```
users 1:N auth_accounts
users 1:N addresses
users 1:1 carts
users 1:1 wishlists
users 1:N orders
users 1:N reviews
```

---

### 2.2 `auth_accounts`

**Purpose:** Stores external authentication identities (currently Google; designed
to support additional OAuth providers without schema changes).

| Column | Type | Null | Constraints |
|---|---|---|---|
| id | BIGINT | No | PK |
| user_id | BIGINT | No | FK → `users.id` |
| provider | VARCHAR(50) | No | |
| provider_account_id | VARCHAR(255) | No | |
| created_at | TIMESTAMP | No | |
| updated_at | TIMESTAMP | No | |

**Constraint:** `UNIQUE(provider, provider_account_id)`

**Design notes:**
- Identity is resolved by `provider + provider_account_id`, **not** by email.
  Email addresses can change on the provider's side or be reused, and are not a
  stable identity key; the provider's immutable account ID is.
- Deleting a `users` row cascades to `auth_accounts` — an auth identity has no
  meaning without its owning user.

**Relationship:** `users 1:N auth_accounts`

---

### 2.3 `addresses`

**Purpose:** Stores reusable shipping addresses belonging to users.

| Column | Type | Null | Constraints |
|---|---|---|---|
| id | BIGINT | No | PK |
| user_id | BIGINT | No | FK → `users.id` |
| first_name | VARCHAR(100) | No | |
| last_name | VARCHAR(100) | No | |
| address_line1 | VARCHAR(255) | No | |
| address_line2 | VARCHAR(255) | Yes | |
| city | VARCHAR(100) | No | |
| state | VARCHAR(100) | Yes | |
| postal_code | VARCHAR(20) | Yes | |
| country | VARCHAR(100) | No | |
| phone | VARCHAR(30) | Yes | |
| is_default | BOOLEAN | No | DEFAULT `false` |
| created_at | TIMESTAMP | No | |
| updated_at | TIMESTAMP | No | |

**Design notes:**
- Recipient name (`first_name`/`last_name`) is stored on the address itself,
  independent of the owning user's account name, since a shipping address may be
  addressed to a different recipient (gift shipments, corporate addresses, etc.).
- Deleting a user cascades to their addresses.

**Relationship:** `users 1:N addresses`

---

### 2.4 `collections`

**Purpose:** Represents major curated jewelry collections (e.g. Engagement Rings,
Wedding Jewelry, Luxury Jewelry).

| Column | Type | Null | Constraints |
|---|---|---|---|
| id | BIGINT | No | PK |
| slug | VARCHAR(150) | No | UNIQUE |
| title | VARCHAR(150) | No | |
| description | TEXT | No | |
| details | TEXT | Yes | |
| created_at | TIMESTAMP | No | |
| updated_at | TIMESTAMP | No | |

**Relationships:**
```
collections 1:N collection_highlights
collections 1:N products
```
A product belongs to **zero or one** collection.

---

### 2.5 `collection_highlights`

**Purpose:** Stores the highlight/bullet points displayed for a collection (e.g.
"Timeless diamond designs", "Elegant and refined craftsmanship").

| Column | Type | Null | Constraints |
|---|---|---|---|
| id | BIGINT | No | PK |
| collection_id | BIGINT | No | FK → `collections.id` |
| text | VARCHAR(255) | No | |
| sort_order | INT | No | DEFAULT `0` |
| created_at | TIMESTAMP | No | |

**Design notes:** Deleting a collection cascades to its highlights — highlights
have no independent meaning.

**Relationship:** `collections 1:N collection_highlights`

---

### 2.6 `categories`

**Purpose:** Represents product categories (Rings, Necklaces, Earrings,
Bracelets, Wedding Bands).

| Column | Type | Null | Constraints |
|---|---|---|---|
| id | BIGINT | No | PK |
| slug | VARCHAR(150) | No | UNIQUE |
| name | VARCHAR(100) | No | UNIQUE |
| description | TEXT | Yes | |
| created_at | TIMESTAMP | No | |
| updated_at | TIMESTAMP | No | |

**Design notes:** A product belongs to **exactly one** category. Category
deletion must **not** cascade to products — a category is a classification
label, and products must not disappear because a taxonomy entry is removed.
(See Section 4 for the recommended handling of this constraint.)

**Relationship:** `categories 1:N products`

---

### 2.7 `products`

**Purpose:** Stores core product information (not price/stock — see
`product_variants`).

| Column | Type | Null | Constraints |
|---|---|---|---|
| id | BIGINT | No | PK |
| slug | VARCHAR(200) | No | UNIQUE |
| name | VARCHAR(200) | No | |
| description | TEXT | No | |
| category_id | BIGINT | No | FK → `categories.id` |
| collection_id | BIGINT | Yes | FK → `collections.id` |
| is_active | BOOLEAN | No | DEFAULT `true` |
| created_at | TIMESTAMP | No | |
| updated_at | TIMESTAMP | No | |

**Design notes:**
- Products deliberately do **not** contain `price`, `stock_quantity`, or `sku` —
  these are properties of a specific purchasable configuration, which is what
  `product_variants` models. This lets a single product (e.g. "Diamond
  Engagement Ring") have many priced/stocked variants (metal, size, carat).
- Products should be deactivated via `is_active = false` rather than physically
  deleted, to preserve historical integrity for past orders and reviews.

**Relationships:**
```
products N:1 categories
products N:1 collections
products 1:N product_images
products 1:N product_variants
products 1:N reviews
```
A product belongs to exactly 1 category and 0–1 collections.

---

### 2.8 `product_images`

**Purpose:** Stores images belonging to a product.

| Column | Type | Null | Constraints |
|---|---|---|---|
| id | BIGINT | No | PK |
| product_id | BIGINT | No | FK → `products.id` |
| image_url | TEXT | No | |
| alt_text | VARCHAR(255) | Yes | |
| sort_order | INT | No | DEFAULT `0` |
| is_primary | BOOLEAN | No | DEFAULT `false` |
| created_at | TIMESTAMP | No | |

**Design notes:** The database stores a URL/path reference, never binary image
data (see Section 8). Deleting a product cascades to its images.

**Relationship:** `products 1:N product_images`

---

### 2.9 `product_variants`

**Purpose:** Represents an individual purchasable configuration of a product
(e.g. 18K Gold / Size 7 / 1 Carat).

| Column | Type | Null | Constraints |
|---|---|---|---|
| id | BIGINT | No | PK |
| product_id | BIGINT | No | FK → `products.id` |
| sku | VARCHAR(100) | No | UNIQUE (global) |
| price | DECIMAL(12,2) | No | >= 0 |
| stock_quantity | INT | No | DEFAULT `0`, >= 0 |
| is_active | BOOLEAN | No | DEFAULT `true` |
| created_at | TIMESTAMP | No | |
| updated_at | TIMESTAMP | No | |

**Design notes:** SKU is globally unique across the entire catalog, not just
within a product.

**Relationships:**
```
products 1:N product_variants
product_variants N:M option_values (via variant_options)
```

---

### 2.10 `option_types`

**Purpose:** Defines the category of a configurable option (Metal, Ring Size,
Diamond Size, Color).

| Column | Type | Null | Constraints |
|---|---|---|---|
| id | BIGINT | No | PK |
| name | VARCHAR(100) | No | UNIQUE |
| created_at | TIMESTAMP | No | |

**Relationship:** `option_types 1:N option_values`

---

### 2.11 `option_values`

**Purpose:** Stores the concrete values belonging to an option type (e.g. Metal
→ 18K Gold, 14K Gold, Platinum).

| Column | Type | Null | Constraints |
|---|---|---|---|
| id | BIGINT | No | PK |
| option_type_id | BIGINT | No | FK → `option_types.id` |
| value | VARCHAR(100) | No | |
| created_at | TIMESTAMP | No | |

**Constraint:** `UNIQUE(option_type_id, value)` — prevents duplicate values
within the same option type (two "Platinum" entries under Metal), while
allowing the same literal string to exist under different types if ever needed.

**Relationships:**
```
option_types 1:N option_values
option_values N:M product_variants (via variant_options)
```

---

### 2.12 `variant_options`

**Purpose:** Join table connecting product variants to the option values that
define them.

| Column | Type | Null | Constraints |
|---|---|---|---|
| variant_id | BIGINT | No | FK → `product_variants.id` |
| option_value_id | BIGINT | No | FK → `option_values.id` |

**Primary key:** `(variant_id, option_value_id)`

**Design notes:** This is a pure associative table with no surrogate key,
reflecting that a (variant, option_value) pairing is inherently unique and
carries no attributes of its own. Example: Variant #15 → {18K Gold, Size 7,
1 Carat} is represented as three rows in `variant_options`.

**Relationship:** `product_variants N:M option_values`

---

### 2.13 `carts`

**Purpose:** Stores the current shopping cart for a user.

| Column | Type | Null | Constraints |
|---|---|---|---|
| id | BIGINT | No | PK |
| user_id | BIGINT | No | FK → `users.id`, UNIQUE |
| created_at | TIMESTAMP | No | |
| updated_at | TIMESTAMP | No | |

**Design notes:** The `UNIQUE` constraint on `user_id` enforces a strict 1:1
relationship — each user has at most one active cart.

**Relationship:** `users 1:1 carts`

---

### 2.14 `cart_items`

**Purpose:** Stores the product variants currently inside a cart.

| Column | Type | Null | Constraints |
|---|---|---|---|
| id | BIGINT | No | PK |
| cart_id | BIGINT | No | FK → `carts.id` |
| product_variant_id | BIGINT | No | FK → `product_variants.id` |
| quantity | INT | No | > 0 |
| created_at | TIMESTAMP | No | |
| updated_at | TIMESTAMP | No | |

**Constraint:** `UNIQUE(cart_id, product_variant_id)` — the same variant cannot
appear as two separate rows in one cart; adding it again increments quantity.

**Design notes:** `cart_items` references `product_variants`, not `products`,
because the cart must capture the exact purchasable configuration (metal,
size, carat) and its current live price/stock.

**Relationship:** `carts 1:N cart_items`

---

### 2.15 `wishlists`

**Purpose:** Stores a user's wishlist.

| Column | Type | Null | Constraints |
|---|---|---|---|
| id | BIGINT | No | PK |
| user_id | BIGINT | No | FK → `users.id`, UNIQUE |
| created_at | TIMESTAMP | No | |
| updated_at | TIMESTAMP | No | |

**Relationship:** `users 1:1 wishlists`

---

### 2.16 `wishlist_items`

**Purpose:** Stores products saved by the user.

| Column | Type | Null | Constraints |
|---|---|---|---|
| id | BIGINT | No | PK |
| wishlist_id | BIGINT | No | FK → `wishlists.id` |
| product_id | BIGINT | No | FK → `products.id` |
| created_at | TIMESTAMP | No | |

**Constraint:** `UNIQUE(wishlist_id, product_id)`

**Design notes:** Unlike `cart_items`, this references `products`, not
`product_variants` — a wishlist expresses interest in the product generally;
the customer selects a specific variant only at the point of purchase.

**Relationship:** `wishlists 1:N wishlist_items`

---

### 2.17 `orders`

**Purpose:** Stores completed or in-progress customer orders.

| Column | Type | Null | Constraints |
|---|---|---|---|
| id | BIGINT | No | PK |
| user_id | BIGINT | No | FK → `users.id` |
| status | ENUM | No | DEFAULT `PENDING` |
| payment_status | ENUM | No | DEFAULT `PENDING` |
| subtotal | DECIMAL(12,2) | No | >= 0 |
| shipping_cost | DECIMAL(12,2) | No | >= 0 |
| total | DECIMAL(12,2) | No | >= 0 |
| shipping_address | JSONB | No | |
| created_at | TIMESTAMP | No | |
| updated_at | TIMESTAMP | No | |

**Order statuses:** `PENDING`, `CONFIRMED`, `PROCESSING`, `SHIPPED`,
`DELIVERED`, `CANCELLED`

**Payment statuses:** `PENDING`, `PAID`, `FAILED`, `REFUNDED`

**Design notes:** `shipping_address` is stored as a JSONB **snapshot** of the
address used at checkout, deliberately decoupled from the user's live
`addresses` row. If the customer later edits or deletes that address, the
order's historical record must remain unchanged.

**Relationship:** `users 1:N orders`

---

### 2.18 `order_items`

**Purpose:** Stores individual line items purchased in an order.

| Column | Type | Null | Constraints |
|---|---|---|---|
| id | BIGINT | No | PK |
| order_id | BIGINT | No | FK → `orders.id` |
| product_variant_id | BIGINT | No | FK → `product_variants.id` |
| product_name | VARCHAR(200) | No | Snapshot |
| sku | VARCHAR(100) | No | Snapshot |
| unit_price | DECIMAL(12,2) | No | >= 0 |
| quantity | INT | No | > 0 |
| subtotal | DECIMAL(12,2) | No | >= 0 |

**Design notes:** `product_name`, `sku`, and `unit_price` are intentionally
denormalized as historical snapshots, independent of the live
`product_variants` row. This guarantees an order remains accurate and
auditable even if the product is later renamed, repriced, or deactivated.

**Relationship:** `orders 1:N order_items`

---

### 2.19 `reviews`

**Purpose:** Stores customer reviews for products.

| Column | Type | Null | Constraints |
|---|---|---|---|
| id | BIGINT | No | PK |
| user_id | BIGINT | No | FK → `users.id` |
| product_id | BIGINT | No | FK → `products.id` |
| rating | SMALLINT | No | 1–5 |
| comment | TEXT | Yes | |
| is_approved | BOOLEAN | No | DEFAULT `false` |
| created_at | TIMESTAMP | No | |
| updated_at | TIMESTAMP | No | |

**Constraint:** `UNIQUE(user_id, product_id)` — a user may submit only one
review per product.

**Design notes:** Reviews attach to `products`, not `product_variants` — the
feedback concerns the product's overall quality/design, not one specific
metal/size configuration.

**Relationship:** `products 1:N reviews`

---

## 3. Complete Relationship Map (Mermaid ERD)

```mermaid
erDiagram
    USERS ||--o{ AUTH_ACCOUNTS : "has"
    USERS ||--o{ ADDRESSES : "has"
    USERS ||--|| CARTS : "owns"
    USERS ||--|| WISHLISTS : "owns"
    USERS ||--o{ ORDERS : "places"
    USERS ||--o{ REVIEWS : "writes"

    COLLECTIONS ||--o{ COLLECTION_HIGHLIGHTS : "has"
    COLLECTIONS ||--o{ PRODUCTS : "groups"

    CATEGORIES ||--o{ PRODUCTS : "classifies"

    PRODUCTS ||--o{ PRODUCT_IMAGES : "has"
    PRODUCTS ||--o{ PRODUCT_VARIANTS : "has"
    PRODUCTS ||--o{ REVIEWS : "receives"
    PRODUCTS ||--o{ WISHLIST_ITEMS : "saved as"

    PRODUCT_VARIANTS ||--o{ VARIANT_OPTIONS : "configured by"
    PRODUCT_VARIANTS ||--o{ CART_ITEMS : "added as"
    PRODUCT_VARIANTS ||--o{ ORDER_ITEMS : "purchased as"

    OPTION_TYPES ||--o{ OPTION_VALUES : "defines"
    OPTION_VALUES ||--o{ VARIANT_OPTIONS : "applied via"

    CARTS ||--o{ CART_ITEMS : "contains"
    WISHLISTS ||--o{ WISHLIST_ITEMS : "contains"

    ORDERS ||--o{ ORDER_ITEMS : "contains"

    USERS {
        bigint id PK
        varchar email UK
        varchar password_hash
        enum role
        boolean is_active
    }
    AUTH_ACCOUNTS {
        bigint id PK
        bigint user_id FK
        varchar provider
        varchar provider_account_id
    }
    ADDRESSES {
        bigint id PK
        bigint user_id FK
        boolean is_default
    }
    COLLECTIONS {
        bigint id PK
        varchar slug UK
        varchar title
    }
    COLLECTION_HIGHLIGHTS {
        bigint id PK
        bigint collection_id FK
        varchar text
    }
    CATEGORIES {
        bigint id PK
        varchar slug UK
        varchar name UK
    }
    PRODUCTS {
        bigint id PK
        varchar slug UK
        bigint category_id FK
        bigint collection_id FK
        boolean is_active
    }
    PRODUCT_IMAGES {
        bigint id PK
        bigint product_id FK
        text image_url
        boolean is_primary
    }
    PRODUCT_VARIANTS {
        bigint id PK
        bigint product_id FK
        varchar sku UK
        decimal price
        int stock_quantity
    }
    OPTION_TYPES {
        bigint id PK
        varchar name UK
    }
    OPTION_VALUES {
        bigint id PK
        bigint option_type_id FK
        varchar value
    }
    VARIANT_OPTIONS {
        bigint variant_id PK_FK
        bigint option_value_id PK_FK
    }
    CARTS {
        bigint id PK
        bigint user_id FK_UK
    }
    CART_ITEMS {
        bigint id PK
        bigint cart_id FK
        bigint product_variant_id FK
        int quantity
    }
    WISHLISTS {
        bigint id PK
        bigint user_id FK_UK
    }
    WISHLIST_ITEMS {
        bigint id PK
        bigint wishlist_id FK
        bigint product_id FK
    }
    ORDERS {
        bigint id PK
        bigint user_id FK
        enum status
        enum payment_status
        jsonb shipping_address
    }
    ORDER_ITEMS {
        bigint id PK
        bigint order_id FK
        bigint product_variant_id FK
        varchar product_name
        varchar sku
        decimal unit_price
    }
    REVIEWS {
        bigint id PK
        bigint user_id FK
        bigint product_id FK
        smallint rating
    }
```

---

## 4. Delete Rules

The guiding principle: **CASCADE** is used where the child record has no
meaning independent of its parent; **RESTRICT / NO ACTION** is used where the
child record must survive parent removal for historical, auditable, or
business reasons.

| Relationship | Rule | Rationale |
|---|---|---|
| `users` → `auth_accounts` | CASCADE | An auth identity is meaningless without its user. |
| `users` → `addresses` | CASCADE | Saved addresses have no purpose without the owning account. |
| `users` → `carts` | CASCADE | A cart cannot exist unowned. |
| `users` → `wishlists` | CASCADE | Same as above. |
| `users` → `orders` | RESTRICT (soft-delete users instead) | Orders are financial/legal records; they must survive even if an account is closed. Prefer deactivating the user (`is_active = false`) over hard deletion. |
| `users` → `reviews` | RESTRICT / anonymize | Reviews contribute to product reputation; deleting a user account should not silently erase or orphan reviews — anonymize (`user_id` nulled or pointed at a "deleted user" placeholder) rather than cascade-delete. |
| `collections` → `collection_highlights` | CASCADE | Highlights are purely descriptive content of the collection. |
| `collections` → `products` | SET NULL (`collection_id` nullable) | A product must survive the removal of a collection; it simply becomes uncollected. |
| `categories` → `products` | RESTRICT / NO ACTION | Products must never disappear because a taxonomy entry is deleted. In practice this is best enforced by disallowing deletion of a category that still has products attached (reassign or deactivate products first). |
| `products` → `product_images` | CASCADE | Images have no purpose without the product. |
| `products` → `product_variants` | CASCADE | Variants cannot exist without a parent product. |
| `products` → `reviews` | RESTRICT (deactivate product instead) | Historical reviews should remain queryable even for a discontinued product; use `is_active = false` on the product, never hard-delete. |
| `products` → `wishlist_items` | CASCADE | A saved reference to a product that no longer exists should be removed. |
| `product_variants` → `variant_options` | CASCADE | The join rows are meaningless without the variant. |
| `product_variants` → `cart_items` | RESTRICT (deactivate variant instead) | Prefer `is_active = false` on the variant and handle removal from carts at the application layer, so a customer's cart can show a clear "no longer available" state rather than silently vanishing. |
| `product_variants` → `order_items` | RESTRICT | Order history must remain intact regardless of what happens to the variant later; `order_items` already stores its own snapshot fields for this reason. |
| `option_types` → `option_values` | RESTRICT | Prevent silent loss of configuration data referenced by existing variants; deletion should be blocked while values are in use. |
| `option_values` → `variant_options` | RESTRICT | Same rationale — an option value in active use by variants should not be deletable without first reassigning those variants. |
| `carts` → `cart_items` | CASCADE | Items have no meaning without the cart. |
| `wishlists` → `wishlist_items` | CASCADE | Same as above. |
| `orders` → `order_items` | CASCADE | Line items belong entirely to their order (deleting an order — an unusual, likely admin-only operation — removes its lines too). |

**General principle:** Products becoming inactive, discontinued, or reassigned
must **never** cascade-delete historical `orders`, `order_items`, or
`reviews`. Historical/financial data integrity takes precedence over catalog
tidiness.

---

## 5. Indexing Strategy

| Index | On | Rationale |
|---|---|---|
| Unique index | `users.email` | Enforces uniqueness and accelerates login lookups (the most frequent query on this table). |
| Composite unique index | `auth_accounts(provider, provider_account_id)` | Enforces the OAuth identity constraint and speeds up the login-via-OAuth lookup path. |
| Index | `auth_accounts.user_id` | Speeds up "list all linked identities for a user" and supports the FK. |
| Index | `addresses.user_id` | Almost every address query is scoped to a user (e.g. "show my saved addresses"). |
| Unique index | `collections.slug` | Slugs are the primary lookup key for public collection pages (SEO-friendly URLs). |
| Unique index | `categories.slug`, `categories.name` | Same rationale — slug-based page routing plus name uniqueness. |
| Unique index | `products.slug` | Product detail pages are routed by slug. |
| Index | `products.category_id` | Supports "browse by category" — one of the most common storefront queries. |
| Index | `products.collection_id` | Supports "browse by collection" pages. |
| Index | `products.is_active` (partial index `WHERE is_active = true`) | Storefront queries almost always filter to active products only; a partial index keeps it small and fast. |
| Index | `product_images.product_id` | Every product detail page fetches all images for that product. |
| Index | `product_variants.product_id` | Every product detail page fetches all variants for that product. |
| Unique index | `product_variants.sku` | SKU is globally unique and used for lookups in fulfillment/inventory contexts. |
| Index | `variant_options.variant_id`, `variant_options.option_value_id` | Both directions of the join table are queried: "options for this variant" and "variants matching this option value." |
| Index | `option_values.option_type_id` | Supports listing all values under a given option type (e.g. all "Metal" values) for building the product configurator UI. |
| Unique index | `carts.user_id` | Enforces the 1:1 relationship and makes "get my cart" an O(1) lookup. |
| Index | `cart_items.cart_id` | Every cart page fetches all items in that cart. |
| Index | `cart_items.product_variant_id` | Supports stock/price-change propagation checks ("which carts contain this variant"). |
| Unique index | `wishlists.user_id` | Same rationale as `carts.user_id`. |
| Index | `wishlist_items.wishlist_id` | Every wishlist page fetches all its items. |
| Index | `orders.user_id` | Order history pages are scoped to a user. |
| Index | `orders.status` | Admin/fulfillment dashboards filter heavily by status (e.g. "all PROCESSING orders"). |
| Index | `orders.payment_status` | Same rationale — reconciliation and dashboard filtering. |
| Index | `order_items.order_id` | Order detail pages fetch all line items for that order. |
| Index | `reviews.product_id` | Product detail pages fetch all approved reviews for that product. |
| Index | `reviews.is_approved` (composite with `product_id`) | Review listing filters to approved-only; a composite `(product_id, is_approved)` index serves this directly. |

**Not recommended:** Indexes on low-cardinality boolean columns in isolation
(e.g. a standalone index on `is_default`), or on columns rarely used in
`WHERE`/`JOIN` clauses (e.g. `created_at` unless the application later adds
date-range reporting). Adding indexes has a write-cost and storage cost, so
each one above is tied to a concrete, anticipated query pattern.

---

## 6. Data Integrity Rules

### 6.1 Enforced at the PostgreSQL level

| Rule | Mechanism |
|---|---|
| Unique emails | `UNIQUE` constraint on `users.email` |
| Unique OAuth identities | `UNIQUE(provider, provider_account_id)` on `auth_accounts` |
| Unique collection/category/product slugs | `UNIQUE` constraints |
| Unique SKUs | `UNIQUE` constraint on `product_variants.sku` |
| Unique cart items | `UNIQUE(cart_id, product_variant_id)` |
| Unique wishlist items | `UNIQUE(wishlist_id, product_id)` |
| One review per user per product | `UNIQUE(user_id, product_id)` on `reviews` |
| Non-negative prices | `CHECK (price >= 0)` on `product_variants`, `orders`, `order_items` |
| Non-negative inventory | `CHECK (stock_quantity >= 0)` |
| Valid review rating | `CHECK (rating BETWEEN 1 AND 5)` |
| Positive cart/order quantities | `CHECK (quantity > 0)` |
| Valid order/payment statuses | Native PostgreSQL `ENUM` types (`order_status`, `payment_status`) |
| Referential integrity | Foreign keys with the delete behaviors specified in Section 4 |
| 1:1 user↔cart, user↔wishlist | `UNIQUE` constraint on the FK column (`carts.user_id`, `wishlists.user_id`) |

### 6.2 Enforced at the application level

| Rule | Reason it belongs in the application |
|---|---|
| Exactly one `is_primary` image per product | A `CHECK`/partial-unique-index approach is possible (`UNIQUE(product_id) WHERE is_primary`), but the simpler and more flexible path is enforcing "only one primary" in application logic when images are created/updated. |
| `shipping_address` JSONB shape validation | PostgreSQL can enforce JSON *validity* but not a specific schema without added tooling; the application validates the address shape before insert. |
| Order total = subtotal + shipping_cost (etc.) | Best enforced at the point of order creation in application/service logic, since it depends on business rules (discounts, tax) that may evolve. |
| Preventing checkout when `stock_quantity` is insufficient | Requires transactional business logic (reserve stock, handle race conditions), not a simple constraint. |
| Preventing deletion of an `option_type`/`option_value` still referenced by active variants | While a `RESTRICT` FK provides a hard backstop, the user-facing "this option is in use" message and safe-reassignment flow belongs in the application. |
| Role-based authorization (`ADMIN` vs `CUSTOMER` capabilities) | Access control logic, not a data constraint. |
| Preventing review submission by a user who hasn't purchased the product (if this rule is adopted) | Requires cross-referencing `orders`/`order_items`, which is a business rule rather than a structural constraint. |

---

## 7. Authentication Design

### 7.1 Local registration
A user registers with `email`, `password`, `first_name`, `last_name`. The
password is hashed (never stored in plaintext) before the `users` row is
created with `password_hash` populated.

### 7.2 Password hashing
Use a slow, salted hashing algorithm designed for credential storage —
bcrypt or argon2 — never a fast general-purpose hash (MD5, SHA-256 alone).
The hash is one-way; the plaintext password is discarded immediately after
hashing and is never logged or persisted.

### 7.3 Local login
The submitted password is hashed with the same algorithm/parameters and
compared to `password_hash`. A `NULL` `password_hash` (Google-only account)
means local login must be rejected with a message directing the user to sign
in via Google instead.

### 7.4 Google OAuth
On successful OAuth callback, the application receives a stable Google
account identifier. It looks up `auth_accounts` by
`(provider = 'google', provider_account_id = <google_sub>)`. If found, the
associated user is logged in. If not found, either a new `users` row is
created (first-time sign-in) or, if a `users` row with the same email already
exists, the flow proceeds to account linking (see 7.5).

### 7.5 OAuth account linking
If a user who registered locally later signs in with Google using the same
email, the application should link the accounts by creating a new
`auth_accounts` row pointing at the existing `users.id`, rather than creating
a duplicate user. This requires an explicit confirmation step (e.g. "An
account with this email already exists — sign in with your password to link
Google") to avoid account-takeover via email spoofing.

### 7.6 Why plaintext passwords must never be stored
A password database is one of the highest-value targets for attackers.
Storing plaintext (or reversibly encrypted) passwords means a single breach
exposes every user's real password — which is frequently reused across other
services. Hashing with a slow, salted algorithm makes recovering the
original password computationally infeasible even if the database is
compromised.

### 7.7 Why OAuth identities use `provider + provider_account_id`
Email addresses are mutable, sometimes shared, and not guaranteed permanent
by the OAuth provider. The provider's internal account ID (e.g. Google's
`sub` claim) is immutable and provider-guaranteed unique, making it the only
safe basis for identity matching. Relying on email alone opens the door to
account confusion or hijacking if a provider ever recycles an email address.

### 7.8 Authentication Extension Tables (not part of the current 19-table schema)

| Table | Purpose | Add before production? |
|---|---|---|
| `password_reset_tokens` | Time-limited tokens for "forgot password" flows | **Yes** — required for any production local-auth flow; without it there is no self-service password recovery path. |
| `email_verification_tokens` | Confirms ownership of an email at registration | **Yes** — recommended before production to prevent fake/typo'd emails and reduce spam/abuse signups. |
| `sessions` / `refresh_tokens` | Server-side session or refresh-token tracking for revocable, long-lived login state | **Recommended** — required if the app uses refresh-token rotation or needs the ability to revoke sessions (e.g. "log out of all devices"); can be deferred only if using short-lived stateless JWTs with no revocation requirement. |

These are **not** added to the current 19-table schema; they are flagged here
as near-term, pre-production additions.

---

## 8. Image Storage Strategy

The database stores only `image_url` (or an equivalent path/reference) —
never binary image data. Rationale: keeping large binary blobs out of
PostgreSQL keeps the database small, fast to back up, and fast to query; the
actual bytes are better served by storage/CDN infrastructure built for that
purpose.

**Possible future storage approaches, in likely progression:**

1. **Local development storage** — images served from a local `/uploads`
   directory or the filesystem during early development; simplest to set up,
   not viable for production or horizontal scaling.
2. **Cloud object storage** — Amazon S3, Cloudflare R2, or Google Cloud
   Storage; `image_url` becomes the object's public or signed URL. Enables
   scalable, durable storage decoupled from application servers.
3. **CDN** — a CDN (CloudFront, Cloudflare, Fastly) placed in front of the
   object storage bucket for low-latency global image delivery and caching,
   with `image_url` pointing at the CDN domain rather than the storage
   provider directly.

No storage implementation is included at this design phase; only the
`image_url` column is specified.

---

## 9. Future Database Extensions

The following tables are **explicitly excluded** from the current 19-table
schema. They are documented here so the schema can accommodate them later
without structural rework, but must not be implemented now.

### 9.1 Payments
- `payments` — will record payment attempts/transactions against an order
  (gateway reference, amount, status, method), separate from the
  order-level `payment_status` summary field.

### 9.2 Inventory
- `inventory_movements` — audit log of stock changes (restock, sale,
  return, adjustment) per variant.
- `stock_reservations` — short-lived holds on stock during checkout to
  prevent overselling under concurrent purchases.

### 9.3 Authentication
- `password_reset_tokens`
- `email_verification_tokens`
- `sessions` / `refresh_tokens`

(Repeated from Section 7.8 for completeness of this summary section.)

### 9.4 Product Variants
- `variant_images` — if variant-specific imagery becomes necessary (e.g. a
  gold vs. platinum ring photographed separately), rather than relying
  solely on shared `product_images`.

### 9.5 Orders
- `order_status_history` — an append-only log of every status transition an
  order goes through, for customer-facing tracking and support/audit
  purposes, supplementing the single current `orders.status` field.

---

## 10. Design Risks and Unresolved Decisions

These are open questions the current design intentionally defers, flagged so
they are addressed consciously during Prisma implementation rather than
discovered mid-build:

1. **Category deletion enforcement.** The rule "category deletion must not
   cascade to products" is stated, but whether this is enforced by a hard DB
   `RESTRICT`, or by application-level checks with a soft `ON DELETE
   RESTRICT` as backstop, should be decided explicitly (Section 4 recommends
   RESTRICT/NO ACTION as the DB-level backstop).
2. **User deletion vs. GDPR-style erasure.** Orders and reviews are designed
   to outlive a deleted user via RESTRICT/anonymization, but full "right to
   be forgotten" compliance (if required by the target markets) will need a
   defined anonymization procedure, not just a blocked delete.
2. **Stock decrement timing.** The design does not yet specify at what point
   in checkout `stock_quantity` is decremented (on order creation vs. on
   payment confirmation) — this materially affects overselling risk and
   should be resolved before implementation, likely alongside the future
   `stock_reservations` table.
3. **Primary image enforcement.** Ensuring exactly one `is_primary` image per
   product is currently an application-level rule (Section 6.2); if data
   integrity here proves critical, a partial unique index
   (`UNIQUE(product_id) WHERE is_primary = true`) is a stronger, DB-enforced
   alternative worth reconsidering.
4. **Order total consistency.** `subtotal`, `shipping_cost`, and `total` on
   `orders` are independent columns with no DB-level constraint tying them
   together (e.g. `total = subtotal + shipping_cost`); this is deferred to
   application logic to allow for future discounts/tax fields, but is a risk
   if the constraint is ever forgotten in a code path.
5. **Multi-currency support.** No currency column currently exists anywhere
   prices are stored (`product_variants.price`, `orders.subtotal`, etc.).
   If international sales are in scope, currency handling should be
   designed before production.
6. **Review eligibility.** Whether only verified purchasers may leave a
   review is not yet decided; if adopted, this becomes an application-level
   rule referencing `order_items` (see Section 6.2).

---

## 11. Final Database Summary

| # | Table | Purpose | Main Relationships |
|---|---|---|---|
| 1 | users | Application user accounts | 1:N auth_accounts, addresses, orders, reviews; 1:1 carts, wishlists |
| 2 | auth_accounts | External OAuth identities | N:1 users |
| 3 | addresses | Reusable shipping addresses | N:1 users |
| 4 | collections | Curated jewelry collections | 1:N collection_highlights, products |
| 5 | collection_highlights | Highlight bullets for a collection | N:1 collections |
| 6 | categories | Product classification | 1:N products |
| 7 | products | Core product data | N:1 categories, collections; 1:N product_images, product_variants, reviews |
| 8 | product_images | Product photos (URL reference) | N:1 products |
| 9 | product_variants | Purchasable configuration (SKU, price, stock) | N:1 products; N:M option_values |
| 10 | option_types | Configurable option categories | 1:N option_values |
| 11 | option_values | Concrete option values | N:1 option_types; N:M product_variants |
| 12 | variant_options | Variant ↔ option value join | N:1 product_variants, option_values |
| 13 | carts | Active shopping cart | 1:1 users; 1:N cart_items |
| 14 | cart_items | Items in a cart | N:1 carts, product_variants |
| 15 | wishlists | User wishlist | 1:1 users; 1:N wishlist_items |
| 16 | wishlist_items | Items in a wishlist | N:1 wishlists, products |
| 17 | orders | Customer orders | N:1 users; 1:N order_items |
| 18 | order_items | Order line items (with snapshots) | N:1 orders, product_variants |
| 19 | reviews | Product reviews | N:1 users, products |

```text
Current schema: 19 tables
Payments: planned future extension
Database: PostgreSQL
ORM: Prisma
Backend: Express.js
```

*This document is the source of truth for the subsequent Prisma schema
implementation. It contains no Prisma models, SQL DDL, or migrations by
design.*