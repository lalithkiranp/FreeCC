import { useEffect, useState } from "react";

export default function ReviewsPage({ restaurantId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/api/reviews/${restaurantId}`)
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error("Error fetching reviews:", err));
  }, [restaurantId]);

  return (
    <div>
      <h2 className="mb-4">⭐ Customer Reviews</h2>

      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <div className="list-group">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="list-group-item list-group-item-action mb-2 rounded"
            >
              <div className="d-flex justify-content-between">
                <strong>{review.customer?.name || "Anonymous"}</strong>
                {/* If your backend doesn’t return a `date`, we skip it */}
              </div>

              <div className="text-warning mb-1">
                {"⭐".repeat(review.rating)}
              </div>

              <p className="mb-0">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
