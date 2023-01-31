import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import MessageCard from "../components/cards/MessageCard";
import { getOrders } from "../fetch/index";
import styles from "./Orders.module.css";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      getOrders(user)
        .then((res) => setOrders(res))
        .catch((err) => alert(err));
    } else {
      setOrders([]);
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) return <MessageCard message="Not Logged In" />;
  if (!orders || orders.length === 0)
    return <MessageCard message="No Orders Yet" />;

  return (
    <div className={styles.container + " bg-white"}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Order Date</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td className={styles.name}>
                <div className="d-flex">
                  <Link to={`/product/${order.productId}`}>
                    <img
                      src={order.imageUrl}
                      alt="product"
                      width="100px"
                      height="100px"
                      className="zoom"
                    />
                  </Link>
                  {order.productName}
                </div>
              </td>
              <td>{order.orderDate.substr(0, 10)}</td>
              <td>{order.quantity}</td>
              <td>{order.totalPrice.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
