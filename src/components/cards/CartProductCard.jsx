import { useState } from "react";

import imagePlaceholder from "../../assets/img/image-placeholder.jpg";
import styles from "./CartProductCard.module.css";
import WarningModal from "../modals/WarningModal";

export default function CartProductCard(props) {
  const { product, deleteProduct, updateProduct } = props;
  const [count, setCount] = useState(product.quantity);

  const discountedPrice = Math.floor(
    (product.price * (100 - product.discount)) / 100
  );

  return (
    <div className={styles.card}>
      <div>
        <img
          src={product.imageUrl || imagePlaceholder}
          alt="product"
          height="150px"
          width="100px"
        />
      </div>
      <div className={styles.details}>
        <h5 className="ovf-ellipse">{product.productName}</h5>
        {product.discount === 0 ? (
          <div className={styles.price}>
            <span className={styles.main}>
              &#8377;{(product.price * count).toLocaleString()}
            </span>
          </div>
        ) : (
          <div className={styles.price}>
            <span className={styles.main}>
              &#8377;{(discountedPrice * count).toLocaleString()}
            </span>
            <span className={styles.original}>
              {" "}
              &#8377;{(product.price * count).toLocaleString()}
            </span>
            <span className={styles.discount}>{product.discount}% off</span>
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
  const [isOpen, setIsOpen] = useState(false);

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
  const remove = () => {
    deleteProduct(product);
    setIsOpen(false);
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
      <button
        onClick={() => setIsOpen(true)}
        className={styles["btn-remove"] + " btn btn-dark"}
      >
        REMOVE
      </button>
      <WarningModal
        isOpen={isOpen}
        message="Are you sure you want to remove it?"
        onConfirm={remove}
        onCancel={() => setIsOpen(false)}
        title="Remove From Cart"
      />
    </>
  );
}
