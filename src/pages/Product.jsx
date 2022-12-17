import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { ReactComponent as StarIcon } from "../assets/svg/star.svg";
import { getProduct } from "../utils/query.js";
import imagePlaceholder from "../assets/img/image-placeholder.jpg";
import styles from "../styles/Product.module.css";

export default function ProductPage() {
  const [product, setProduct] = useState();
  const productId = Number(useParams().productId);

  useEffect(() => {
    getProduct(productId)
      .then((product) => setProduct(product))
      .catch((error) => console.log(error));
  }, [productId]);

  if (!product) {
    return <h3>Loading...</h3>;
  }

  return (
    <>
      <div
        className="display-container product-page bg-white"
        style={{ padding: "50px" }}
      >
        <div className="row">
          <div className="col col-12 col-lg-6">
            <Preview imageUrl={product.imageUrl} />
          </div>
          <div className="col col-12 col-lg-6">
            <Details product={product} />
          </div>
        </div>
      </div>
    </>
  );
}

function Preview(props) {
  const { imageUrl } = props;

  return (
    <div className={styles.preview}>
      <img
        src={imageUrl || imagePlaceholder}
        alt="Product"
        height="500px"
        width="80%"
      />
    </div>
  );
}

function Details(props) {
  const { productName, discount, price, reviewCount, totalRating } =
    props.product;

  const discountedPrice = Math.floor((price * (100 - discount)) / 100);
  const rating = reviewCount === 0 ? 0.0 : totalRating / reviewCount;

  return (
    <div>
      <h3>{productName}</h3>
      <br />
      <div className={styles.rating}>
        <div className={styles.score}>
          <span>{rating.toFixed(1) + " "}</span>
          <StarIcon className={styles.star} />
        </div>
        <span className={styles.reviews}>
          {" "}
          {reviewCount.toLocaleString()} Reviews
        </span>
      </div>
      {discount === 0 ? (
        <div className={styles.price}>
          <span className={styles.main}>&#8377;{price.toLocaleString()}</span>
        </div>
      ) : (
        <div className={styles.price}>
          <span className={styles.main}>
            &#8377;{discountedPrice.toLocaleString()}
          </span>
          <span className={styles.original}>
            {" "}
            &#8377;{price.toLocaleString()}
          </span>
          <span className={styles.discount}>{discount}% off</span>
        </div>
      )}
    </div>
  );
}
