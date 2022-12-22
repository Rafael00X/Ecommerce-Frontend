import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  getCart,
  placeOrder,
  removeProductFromCart,
  updateProductInCart,
} from "../utils/query";
import CartProductCard from "../components/cards/CartProductCard";
import styles from "./Cart.module.css";
import MessageCard from "../components/cards/MessageCard";

export default function CartPage() {
  const [products, setProducts] = useState([]);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const deleteProduct = (product) => {
    removeProductFromCart(product.productId)
      .then((res) => setProducts(res))
      .catch((err) => alert(err));
  };
  const updateProduct = (product) => {
    updateProductInCart(product.productId, product.quantity)
      .then((res) => setProducts(res))
      .catch((err) => alert(err));
  };

  useEffect(() => {
    if (isLoggedIn) {
      getCart()
        .then((products) => {
          setProducts(products);
        })
        .catch((error) => console.log(error));
    } else {
      setProducts([]);
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) return <MessageCard message="Not Logged In" />;
  if (!products || products.length === 0)
    return <MessageCard message="Cart Is Empty" />;

  let total = 0;
  products.forEach((product) => {
    const discountedPrice = Math.floor(
      (product.price * (100 - product.discount)) / 100
    );
    total += discountedPrice * product.quantity;
  });

  return (
    <div className="bg-white">
      {products.map((product) => {
        return (
          <CartProductCard
            key={product.productId}
            product={product}
            deleteProduct={deleteProduct}
            updateProduct={updateProduct}
          />
        );
      })}
      <Payment total={total} />
    </div>
  );
}

function Payment(props) {
  const { total } = props;
  const handlePay = () => {
    placeOrder()
      .then(() => alert("Order Placed!"))
      .catch((err) => alert(err));
  };
  return (
    <div className={styles.payment}>
      <h3 className={styles.total}>Total = &#8377;{total.toLocaleString()}</h3>
      <button className={"btn btn-dark " + styles.pay} onClick={handlePay}>
        PROCEED TO PAY
      </button>
    </div>
  );
}
