import { Link, useLocation, useMatches } from "react-router-dom";

import collections from "../data/collections";
import featuredProducts from "../data/featuredProducts";

const formatSegment = (value) =>
    value
        .split("-")
        .filter(Boolean)
        .map((part) =>
            part.charAt(0).toUpperCase() + part.slice(1)
        )
        .join(" ");

export default function Breadcrumbs() {
    const location = useLocation();
    const matches = useMatches();
    const { pathname } = location;

    const buildPathBreadcrumbs = () => {
        const crumbs = [{ label: "Home", to: "/" }];

        if (pathname === "/") {
            return [{ label: "Home", to: "/", current: true }];
        }

        if (pathname === "/collections") {
            return [
                { label: "Home", to: "/" },
                { label: "Collections", to: "/collections", current: true },
            ];
        }

        if (pathname.startsWith("/collections/")) {
            const collectionSlug = pathname.split("/").filter(Boolean)[1];
            const collection = collections.find(
                (item) => item.slug === collectionSlug
            );

            crumbs.push({
                label: "Collections",
                to: "/collections",
            });

            crumbs.push({
                label: collection?.title ?? formatSegment(collectionSlug),
                to: `/collections/${collectionSlug}`,
                current: true,
            });

            return crumbs;
        }

        if (pathname.startsWith("/products/")) {
            const productSlug = pathname.split("/").filter(Boolean)[1];
            const product = featuredProducts.find(
                (item) => item.slug === productSlug
            );
            const collection = product
                ? collections.find((item) => item.slug === product.collection)
                : null;

            crumbs.push({ label: "Collections", to: "/collections" });

            if (collection) {
                crumbs.push({
                    label: collection.title,
                    to: `/collections/${collection.slug}`,
                });
            }

            crumbs.push({
                label: product?.title ?? formatSegment(productSlug),
                to: product ? `/products/${product.slug}` : undefined,
                current: true,
            });

            return crumbs;
        }

        const routeMatch = matches.find(
            (match) => match.pathname === pathname
        );

        const staticLabel =
            routeMatch?.handle?.breadcrumb ||
            {
                "/about": "About",
                "/contact": "Contact",
                "/login": "Login",
                "/register": "Register",
            }[pathname];

        if (staticLabel) {
            return [
                { label: "Home", to: "/" },
                { label: staticLabel, to: pathname, current: true },
            ];
        }

        const lastSegment = pathname.split("/").filter(Boolean).at(-1);

        return [
            { label: "Home", to: "/" },
            {
                label: lastSegment ? formatSegment(lastSegment) : "Page",
                to: pathname,
                current: true,
            },
        ];
    };

    const breadcrumbs = buildPathBreadcrumbs();

    if (breadcrumbs.length === 0) {
        return null;
    }

    return (
        <nav className="breadcrumbs" aria-label="Breadcrumb">
            <ol className="breadcrumbs-list">
                {breadcrumbs.map((crumb, index) => {
                    const isCurrent = crumb.current || index === breadcrumbs.length - 1;

                    return (
                        <li key={`${crumb.label}-${index}`} className="breadcrumb-item">
                            {isCurrent ? (
                                <span
                                    className="breadcrumb-current"
                                    aria-current="page"
                                >
                                    {crumb.label}
                                </span>
                            ) : (
                                <>
                                    <Link to={crumb.to} className="breadcrumb-link">
                                        {crumb.label}
                                    </Link>
                                    <span className="breadcrumb-separator" aria-hidden="true">
                                        ›
                                    </span>
                                </>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
