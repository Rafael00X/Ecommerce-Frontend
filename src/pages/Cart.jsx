import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  getCart,
  placeOrder,
  removeProductFromCart,
  updateProductInCart,
} from "../fetch/index";
import CartProductCard from "../components/cards/CartProductCard";
import styles from "./Cart.module.css";
import MessageCard from "../components/cards/MessageCard";

export default function CartPage() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(null);
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  console.log(cart);

  const deleteProduct = (product) => {
    removeProductFromCart(product.cartItemId, user)
      .then((res) => setCart(res))
      .catch((err) => alert(err));
  };
  const updateProduct = (product) => {
    updateProductInCart(product.cartItemId, product.quantity, user)
      .then((res) => setCart(res))
      .catch((err) => alert(err));
  };

  useEffect(() => {
    if (isLoggedIn) {
      getCart(user)
        .then((cart) => {
          setCart(cart);
        })
        .catch((error) => console.log(error));
    } else {
      setCart(null);
    }
  }, [isLoggedIn, user]);

  if (!isLoggedIn) return <MessageCard message="Not Logged In" />;
  if (!cart || cart.cartItems.length == 0)
    return <MessageCard message="Cart Is Empty" />;

  const total = cart.totalAmount;

  return (
    <div className="bg-white">
      {cart.cartItems.map((product) => {
        return (
          <CartProductCard
            key={product.cartItemId}
            product={product}
            deleteProduct={deleteProduct}
            updateProduct={updateProduct}
          />
        );
      })}
      <Payment total={total} user={user} setCart={setCart} />
    </div>
  );
}

function Payment(props) {
  const { total, user, setCart } = props;
  const handlePay = () => {
    placeOrder(user)
      .then(() => {
        alert("Order Placed!");
        setCart((prev) => {
          return { ...prev, cartItems: [] };
        });
      })
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
