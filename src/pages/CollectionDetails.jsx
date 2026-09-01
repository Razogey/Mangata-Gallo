import { Link, useParams } from "react-router-dom";

import collections from "../data/collections";

export default function CollectionDetails() {
    const { slug } = useParams();

    const collection = collections.find(
        (item) => item.path === `/collections/${slug}`
    );

    if (!collection) {
        return (
            <main className="collection-details">
                <div className="collection-not-found">
                    <h1>Collection Not Found</h1>

                    <p>
                        The collection you're looking for doesn't exist.
                    </p>

                    <Link to="/collections">
                        Back to Collections
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="collection-details">
            <section className="collection-details-content">
                <div className="collection-details-image">
                    <img
                        src={collection.image}
                        alt={collection.title}
                    />
                </div>

                <div className="collection-details-info">
                    <span>Collection</span>

                    <h1>{collection.title}</h1>

                    <p>{collection.description}</p>

                    <Link to="/contact">
                        Inquire About This Collection
                    </Link>

                    <Link
                        to="/collections"
                        className="back-link"
                    >
                        ← Back to Collections
                    </Link>
                </div>
            </section>
        </main>
    );
}