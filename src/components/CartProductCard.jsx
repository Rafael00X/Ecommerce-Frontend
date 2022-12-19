import { useState } from "react";

import imagePlaceholder from "../assets/img/image-placeholder.jpg";
import styles from "../styles/CartProductCard.module.css";

export default function CartProductCard(props) {
  const {
    product,
    product: { productName, productId, price, imageUrl, quantity, discount },
    index,
  } = props.values;
  const { deleteProduct, updateProduct } = props.methods;

  const [count, setCount] = useState(quantity);
  const discountedPrice = Math.floor((price * (100 - discount)) / 100);

  return (
    <div className={styles.card}>
      <div>
        <img
          src={imageUrl || imagePlaceholder}
          alt="product"
          height="150px"
          width="100px"
        />
      </div>
      <div className={styles.details}>
        <h5>{productName}</h5>
        {discount === 0 ? (
          <div className={styles.price}>
            <span className={styles.main}>
              &#8377;{(price * count).toLocaleString()}
            </span>
          </div>
        ) : (
          <div className={styles.price}>
            <span className={styles.main}>
              &#8377;{(discountedPrice * count).toLocaleString()}
            </span>
            <span className={styles.original}>
              {" "}
              &#8377;{(price * count).toLocaleString()}
            </span>
            <span className={styles.discount}>{discount}% off</span>
          </div>
        )}
      </div>
      <div>
        <Controls
          values={{ product, count }}
          methods={{ deleteProduct, updateProduct, setCount }}
        />
      </div>
    </div>
  );
}

function Controls(props) {
  const { product, count } = props.values;
  const { deleteProduct, updateProduct, setCount } = props.methods;
  const increment = () => {
    updateProduct({ ...product, quantity: count + 1 });
    setCount((prev) => prev + 1);
  };
  const decrement = () => {
    if (count > 1) {
      updateProduct({ ...product, quantity: count - 1 });
      setCount((prev) => prev - 1);
    }
  };
  const reset = () => {
    updateProduct({ ...product, quantity: 1 });
    setCount(1);
  };
  const remove = () => {
    deleteProduct(product);
  };

  return (
    <>
      <div className={styles["box-counter"]}>
        <button className={styles["btn-counter"]} onClick={decrement}>
          -
        </button>
        <span className={styles["text-counter"]}>{count}</span>
        <button className={styles["btn-counter"]} onClick={increment}>
          +
        </button>
      </div>
      <div className={styles["btn-wrapper"]}>
        <button
          className={styles["btn-reset"] + " btn btn-light"}
          onClick={reset}
        >
          RESET
        </button>
        <button
          className={styles["btn-delete"] + " btn btn-dark"}
          onClick={remove}
        >
          REMOVE
        </button>
      </div>
    </>
  );
}
