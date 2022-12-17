import React from "react";
import { Link } from "react-router-dom";

import { ReactComponent as StarIcon } from "../assets/svg/star.svg";
import imagePlaceholder from "../assets/img/image-placeholder.jpg";
import styles from "../styles/ProductCard.module.css";

export default function ProductCard(props) {
  const {
    product: { productId, productName, imageUrl, price, discount },
  } = props;

  const reviewCount = 3;
  const totalRating = 13;

  const discountedPrice = Math.floor((price * (100 - discount)) / 100);
  const rating = reviewCount === 0 ? 0.0 : totalRating / reviewCount;

  return (
    <div className={styles["product-card"] + " bg-white"}>
      <Link to={`/product/${productId}`}>
        <div className={styles.container}>
          <img
            src={imageUrl || imagePlaceholder}
            alt="Product"
            width="200px"
            height="250px"
            style={{ display: "inline-block" }}
          />
          <div className={styles.details}>
            <h5 className="ovf-ellipse">{productName}</h5>
            <div className={styles.rating}>
              <span className={styles.score}>
                {rating.toFixed(1)} <StarIcon className={styles.star} />
              </span>
              <span className={styles.reviews}>
                {" "}
                {reviewCount.toLocaleString()} Reviews
              </span>
            </div>
            {discount === 0 ? (
              <div className={styles.price}>
                <span className={styles.main}>
                  &#8377;{price.toLocaleString()}
                </span>
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
        </div>
      </Link>
    </div>
  );
}
