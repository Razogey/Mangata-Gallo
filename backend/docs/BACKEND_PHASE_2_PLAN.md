# Backend Phase 2 Plan — Mangata & Gallo

This document is the main reference for **Backend Phase 2** of the Mangata & Gallo full-stack e-commerce web application. It covers the current state of the backend, architecture decisions, completed work, remaining work, implementation order, and important constraints. It should be updated as development progresses.

---

## 1. Project Overview

**Mangata & Gallo** is a full-stack e-commerce web application.

The project originally started as a static **HTML/CSS** project and was later migrated to **React/Vite**. Backend Phase 2 introduces a **Django REST Framework** backend to replace the project's earlier Express/Prisma backend attempt, which is preserved for reference only (see [Section 8](#8-existing-expressprisma-legacy-reference-architecture)).

---

## 2. Current Architecture

Monorepo structure:

```text
final_project/
├── frontend/          # React + Vite frontend
├── backend/           # Django backend
├── docs/
├── .github/
├── README.md
└── unused_photos/
```

Target end-to-end architecture (once backend integration is complete):

```text
React/Vite
    |
    | HTTP / Axios or Fetch
    v
Django REST API
    |
    v
PostgreSQL
```

### Frontend (Phase 1 — largely complete)

- [x] React/Vite migration
- [x] Componentization
- [x] React Router
- [x] Breadcrumbs
- [x] Scroll restoration
- [x] Responsive design
- [x] CSS design system/tokens
- [x] Image optimization/lazy loading
- [x] GitHub Pages deployment

---

## 3. Current Backend Stack

| Component        | Choice                     |
|-------------------|----------------------------|
| Language          | Python                     |
| Framework         | Django 5.2                 |
| API layer         | Django REST Framework (DRF)|
| Database          | PostgreSQL                 |
| DB driver         | psycopg                    |
| Env config        | python-dotenv               |
| Auth strategy     | JWT authentication          |

Backend location:

```text
backend/
```

---

## 4. Current Git Branch

```text
feature/backend-django
```

---

## 5. Completed Backend Work

### 5.1 Django Setup

- [x] Django project created via `django-admin startproject config .`
- [x] `manage.py` exists
- [x] `config/settings.py` exists
- [x] `accounts` app created
- [x] Django REST Framework installed and added to `INSTALLED_APPS`

### 5.2 PostgreSQL

- [x] Fresh PostgreSQL database created specifically for Django:

```text
mangata_gallo_django
```

- [x] Database credentials stored in `.env` (never committed to Git)

Example `.env`:

```env
DB_NAME=mangata_gallo_django
DB_USER=postgres
DB_PASSWORD=...
DB_HOST=localhost
DB_PORT=5432
```

- [x] Django successfully connects to PostgreSQL
- [x] Initial migrations applied

### 5.3 Custom User Model

```python
AUTH_USER_MODEL = "accounts.User"
```

Based on `AbstractUser`, containing:

- `username`
- `email` (unique)
- `password`
- `first_name`
- `last_name`
- `role`
- Django's standard user fields

Current role choices:

```text
customer
staff
admin
```

### 5.4 Migrations

- [x] Initial `accounts` migration created and applied
- [x] Second migration created to make `email` unique
- [x] `python manage.py check` passes without errors

---

## 6. Authentication Decisions

**Requirement:** Users must be able to log in using either their **username OR email address**, together with their password. The backend determines whether `login` is a username or an email automatically.

Example login payloads:

```json
{
  "login": "rizga",
  "password": "..."
}
```

```json
{
  "login": "user@example.com",
  "password": "..."
}
```

**Decisions:**
- JWT will be used for API authentication (access + refresh tokens).
- Password hashing/cryptography will rely entirely on Django's built-in authentication primitives — nothing will be implemented from scratch.

---

## 7. Database Strategy

- A dedicated PostgreSQL database (`mangata_gallo_django`) was created specifically for the Django backend, separate from any prior Prisma-managed database.
- Django models will be built **incrementally, feature by feature**, using the old Prisma schema strictly as a **reference**, not as a blueprint to replicate all at once.
- Migrations are created and applied per-feature, following the standard Django workflow (model → migration → apply).

---

## 8. Existing Express/Prisma Legacy (Reference Architecture)

Before Django, the project had an **Express + Prisma + PostgreSQL** backend.

**Important constraints:**
- The old Express/Prisma implementation **must NOT be deleted**.
- The following branches are kept as references and must remain intact:

```text
feature/backend-express
feature/database-schema
```

- The old Prisma schema contains approximately **19 domain tables** and should be treated as a **reference** for the Django implementation.
- Django models must **not** attempt to recreate all 19 tables at once — models are recreated incrementally, one feature at a time.

---

## 9. Backend Phase 2 Roadmap

The roadmap below is documented in exact implementation order.

### 9.1 Foundation & Configuration

**Status: `COMPLETED`**

- [x] Django
- [x] DRF
- [x] PostgreSQL
- [x] Environment configuration
- [x] `accounts` app
- [x] Custom User model
- [x] Migrations
- [x] Basic project configuration

### 9.2 Authentication

**Status: `NEXT`** ← Immediate next task, see [Section 14](#14-immediate-next-task)

Endpoints:

```text
POST /api/auth/register/
POST /api/auth/login/
POST /api/auth/logout/
POST /api/auth/token/refresh/
GET  /api/auth/me/
```

Requirements:

- [ ] Register users
- [ ] Validate username
- [ ] Validate unique email
- [ ] Secure password handling using Django's authentication primitives
- [ ] Login using username OR email
- [ ] JWT access token
- [ ] JWT refresh token
- [ ] Current authenticated user endpoint
- [ ] Logout/token invalidation strategy where appropriate
- [ ] Do not implement password hashing or cryptography from scratch

### 9.3 Users & Authorization

- [ ] Implement `customer` / `staff` / `admin` roles
- [ ] Define appropriate DRF permissions

Customers should be able to:
- [ ] View products
- [ ] Manage their cart
- [ ] Manage wishlist
- [ ] Create orders
- [ ] View their orders
- [ ] Write/manage their reviews
- [ ] Manage their own profile

Staff/admin:
- [ ] Appropriate management permissions

Constraint:
- [ ] Users must never access or modify another user's private resources

### 9.4 Products

Endpoints:

```text
GET    /api/products/
GET    /api/products/{id}/
POST   /api/products/
PUT    /api/products/{id}/
PATCH  /api/products/{id}/
DELETE /api/products/{id}/
```

- [ ] Implement Product CRUD
- [ ] Protect management operations with permissions

### 9.5 Categories & Collections

- [ ] Create `Category` model and API
- [ ] Create `Collection` model and API
- [ ] Relate products to categories/collections appropriately

Example filtering:

```text
/api/products/?category=rings
/api/products/?collection=wedding
```

### 9.6 Product Images

- [ ] Implement a separate `ProductImage` model

Potential fields:

```text
product
image
alt_text
sort_order
is_primary
```

- [ ] A product should support multiple images

### 9.7 Product Search, Filtering, Sorting & Pagination

- [ ] Search
- [ ] Category filtering
- [ ] Collection filtering
- [ ] Price filtering
- [ ] Other useful product filters
- [ ] Sorting
- [ ] Pagination

Examples:

```text
/api/products/?search=diamond
/api/products/?min_price=100&max_price=1000
```

### 9.8 Cart

- [ ] Implement `Cart` model
- [ ] Implement `CartItem` model

Users should be able to:
- [ ] View cart
- [ ] Add product
- [ ] Change quantity
- [ ] Remove product
- [ ] Calculate totals correctly

### 9.9 Wishlist

- [ ] Implement `Wishlist` model
- [ ] Implement `WishlistItem` model

Users should be able to:
- [ ] View wishlist
- [ ] Add product
- [ ] Remove product

### 9.10 Orders

- [ ] Implement `Order` model
- [ ] Implement `OrderItem` model

`OrderItem` must preserve the historical purchase price:

```text
OrderItem
├── order
├── product
├── quantity
├── unit_price
└── subtotal
```

Constraint:
- [ ] The product's current price must never overwrite the historical order price
- [ ] Implement appropriate order statuses and payment status fields

### 9.11 Reviews

- [ ] Implement `Review` model

Potential fields:

```text
user
product
rating
title
comment
created_at
updated_at
```

- [ ] Restrict rating to an appropriate range (e.g. `1–5`)
- [ ] Implement appropriate ownership and moderation rules

### 9.12 API Architecture

- [ ] Serializers
- [ ] Validation
- [ ] Permissions
- [ ] Pagination
- [ ] Filtering
- [ ] Consistent error responses
- [ ] Reusable utilities where appropriate
- [ ] Clean URL organization

Expected general API structure:

```text
/api/
├── auth/
├── products/
├── categories/
├── collections/
├── cart/
├── wishlist/
├── orders/
└── reviews/
```

### 9.13 Security

- [ ] Password handling review
- [ ] JWT configuration review
- [ ] Token expiration review
- [ ] Permissions review
- [ ] Authorization review
- [ ] Object ownership review
- [ ] CORS
- [ ] CSRF where applicable
- [ ] Allowed hosts
- [ ] Secret management
- [ ] Environment variables
- [ ] Production configuration

Never commit:

```text
.env
secret keys
database passwords
JWT secrets
```

### 9.14 Django Admin

Register the following models in Django Admin:

- [ ] Users
- [ ] Products
- [ ] Categories
- [ ] Collections
- [ ] Product images
- [ ] Orders
- [ ] Order items
- [ ] Reviews

### 9.15 Testing

Run tests with:

```bash
python manage.py test
```

**Authentication**
- [ ] Successful registration
- [ ] Duplicate username
- [ ] Duplicate email
- [ ] Login using username
- [ ] Login using email
- [ ] Invalid password
- [ ] Unauthenticated access

**Authorization**
- [ ] Customer permissions
- [ ] Staff permissions
- [ ] Admin permissions
- [ ] Ownership checks

**Products**
- [ ] List
- [ ] Detail
- [ ] Create
- [ ] Update
- [ ] Delete

**Cart**
- [ ] Add
- [ ] Update
- [ ] Remove

**Orders**
- [ ] Creation
- [ ] Listing own orders
- [ ] Authorization
- [ ] Historical pricing

**Reviews**
- [ ] Creation
- [ ] Update
- [ ] Deletion
- [ ] Ownership

### 9.16 React Frontend Integration

To be done **after** the backend APIs are stable.

- [ ] Replace static/mock frontend product data with API data
- [ ] Integrate authentication
- [ ] Integrate product listing
- [ ] Integrate product details
- [ ] Integrate cart
- [ ] Integrate wishlist
- [ ] Integrate orders
- [ ] Integrate reviews

### 9.17 Deployment Preparation

**Status: deferred** — deployment itself is intentionally deferred for now.

When the backend is stable, prepare:

- [ ] `requirements.txt`
- [ ] Production settings
- [ ] Environment variables
- [ ] PostgreSQL production configuration
- [ ] CORS configuration
- [ ] Allowed hosts
- [ ] Static files
- [ ] Secure secret configuration
- [ ] Production server configuration

> Do not focus on actual backend deployment yet.

---

## 10. API Roadmap Summary

| # | Area                    | Status       |
|---|--------------------------|--------------|
| 1 | Foundation & Configuration | COMPLETED  |
| 2 | Authentication           | NEXT         |
| 3 | Users & Authorization    | Pending      |
| 4 | Products                 | Pending      |
| 5 | Categories & Collections | Pending      |
| 6 | Product Images           | Pending      |
| 7 | Search/Filter/Sort/Pagination | Pending |
| 8 | Cart                     | Pending      |
| 9 | Wishlist                 | Pending      |
| 10| Orders                   | Pending      |
| 11| Reviews                  | Pending      |
| 12| API Architecture         | Pending      |
| 13| Security                 | Pending      |
| 14| Django Admin             | Pending      |
| 15| Testing                  | Pending      |
| 16| React Frontend Integration | Pending   |
| 17| Deployment Preparation   | Deferred     |

---

## 11. Security Requirements

Covered in detail in [Section 9.13](#913-security). Key points to always enforce going forward:

- Never commit `.env`, secret keys, database passwords, or JWT secrets.
- Use Django's built-in authentication primitives for password handling — no custom cryptography.
- Enforce object-level ownership checks (a user must never access/modify another user's private resources).
- Review CORS/CSRF/allowed hosts settings before any production configuration work.

---

## 12. Testing Strategy

- Tests are written per feature, immediately after implementation (see [Implementation Strategy](#13-implementation-strategy)).
- Run via:

```bash
python manage.py test
```

- Minimum required coverage is listed in [Section 9.15](#915-testing) and spans authentication, authorization, products, cart, orders, and reviews.

---

## 13. Implementation Strategy

Development is **incremental**. Do **not** implement the entire backend in one step.

Workflow per feature:

```text
Feature
   ↓
Model
   ↓
Migration
   ↓
Serializer
   ↓
View / ViewSet
   ↓
URL
   ↓
Permissions
   ↓
Tests
   ↓
Manual API verification
   ↓
Git commit
   ↓
Next feature
```

Each feature must be completed and verified before moving to the next.

---

## 14. Immediate Next Task

```text
Authentication
```

Steps, in order:

1. [ ] Register
2. [ ] Login using username OR email
3. [ ] JWT access/refresh
4. [ ] Current user endpoint
5. [ ] Logout strategy
6. [ ] Authentication tests

---

## 15. Git Workflow

Keep commits focused and scoped to a single concern.

Example commit messages:

```text
feat: add user registration API
feat: add username or email login
feat: add JWT authentication
feat: add current user endpoint
test: add authentication API tests
```

**Constraint:** Do not mix unrelated frontend and backend changes in the same commit.

---

## 16. Important Constraints & Decisions

- The old Express/Prisma backend must **never be deleted**; `feature/backend-express` and `feature/database-schema` remain as references.
- The old Prisma schema (~19 tables) is a **reference only** — Django models are recreated incrementally per feature, never all at once.
- `.env` and all secrets (DB passwords, JWT secrets, keys) must never be committed to Git.
- Password hashing/cryptography must always use Django's built-in authentication primitives — never custom implementations.
- Authentication supports login via **username OR email**, resolved automatically by the backend.
- `OrderItem.unit_price` must preserve the historical price at time of purchase; a product's current price must never overwrite it.
- Users must never access or modify another user's private resources — ownership checks are mandatory across cart, wishlist, orders, and reviews.
- Deployment work is deferred until the backend is stable — Phase 2 focuses on API completeness first.
- Frontend/backend changes must not be mixed in the same Git commit.

---

*This document should be kept up to date as development progresses. Update status markers, checkboxes, and the "Immediate Next Task" section after each completed feature.*
