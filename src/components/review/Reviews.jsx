import { useSelector } from "react-redux";

import { deleteReviewOfProduct } from "../../utils/query";
import AddReview from "./AddReview";
import ReviewCard from "./ReviewCard";

export default function Reviews(props) {
  const { product, setProduct } = props;
  const user = useSelector((state) => state.auth.user);

  if (product.reviews.length === 0) return <AddReview />;
  const ownReview = product.reviews.find(
    (review) => review.userId === Number(user?.userId)
  );
  const handleDelete = () => {
    deleteReviewOfProduct(ownReview)
      .then((res) => setProduct(res))
      .catch((err) => alert(err));
  };

  return (
    <>
      <h3>Reviews</h3>
      {product.reviews.map((review) => (
        <ReviewCard key={review.reviewId} review={review} />
      ))}
      {!ownReview ? (
        <>
          <hr />
          <AddReview setProduct={setProduct} productId={product.productId} />
        </>
      ) : (
        <button type="button" className="btn btn-dark" onClick={handleDelete}>
          Delete Review
        </button>
      )}
    </>
  );
}
