import { useEffect, useState } from "react";

import { getCart, placeOrder } from "../utils/query";
import CartProductCard from "../components/cards/CartProductCard";
import styles from "./Cart.module.css";

export default function CartPage() {
  const [products, setProducts] = useState([]);

  const deleteProduct = (product) => {
    setProducts((prevProducts) =>
      prevProducts.filter((p) => p.productId !== product.productId)
    );
  };
  const updateProduct = (product) => {
    setProducts((prevProducts) => {
      const newProducts = [];
      prevProducts.forEach((p) => {
        if (p.productId === product.productId) p.quantity = product.quantity;
        newProducts.push(p);
      });
      return newProducts;
    });
  };

  useEffect(() => {
    getCart()
      .then((products) => {
        setProducts(products);
      })
      .catch((error) => console.log(error));
  }, []);

  let total = 0;
  products.forEach((product) => {
    const discountedPrice = Math.floor(
      (product.price * (100 - product.discount)) / 100
    );
    total += discountedPrice * product.quantity;
  });

  if (!products || products.length === 0)
    return (
      <div style={{ textAlign: "center", height: "200px", padding: "80px" }}>
        <h3>Cart is empty</h3>
      </div>
    );

  return (
    <div className="bg-white">
      {products.map((product, index) => {
        return (
          <CartProductCard
            key={product.productId}
            values={{ index, product }}
            methods={{ deleteProduct, updateProduct }}
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
    placeOrder();
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
