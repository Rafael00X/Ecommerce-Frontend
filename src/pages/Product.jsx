import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { ReactComponent as StarIcon } from "../assets/svg/star.svg";
import {
  getProduct,
  addProductToCart,
  getProductFromCart,
} from "../utils/query.js";
import imagePlaceholder from "../assets/img/image-placeholder.jpg";
import styles from "./Product.module.css";

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
            <div className={styles.preview}>
              <img
                src={product.imageUrl || imagePlaceholder}
                alt="Product"
                height="500px"
                width="80%"
              />
            </div>
            <CartButton productId={product.productId} />
          </div>
          <div className="col col-12 col-lg-6">
            <Details product={product} />
          </div>
        </div>
      </div>
    </>
  );
}

function CartButton(props) {
  const { productId } = props;
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const navigate = useNavigate();
  const handleAddToCart = () => {
    addProductToCart(productId, 1)
      .then((response) => navigate("/cart"))
      .catch((error) => console.log(error));
  };
  const handleGoToCart = () => {
    navigate("/cart");
  };

  useEffect(() => {
    getProductFromCart(productId)
      .then((product) => {
        if (product) setIsAddedToCart(true);
      })
      .catch((error) => console.log(error));
  }, [productId]);

  return (
    <button
      className={styles["btn-cart"] + " btn btn-dark"}
      onClick={isAddedToCart ? handleGoToCart : handleAddToCart}
    >
      {isAddedToCart ? "GO TO CART" : "ADD TO CART"}
    </button>
  );
}

function Details(props) {
  const {
    productName,
    discount,
    price,
    reviewCount,
    totalRating,
    description,
  } = props.product;

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
      <div>
        <h3>Description</h3>
        <span>{description}</span>
      </div>
    </div>
  );
}
