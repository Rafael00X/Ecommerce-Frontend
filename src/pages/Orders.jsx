import { Link } from "react-router-dom";

import { getOrders } from "../utils/query";
import styles from "./Orders.module.css";

export default function Order() {
  const orders = getOrders();

  if (!orders || orders.length === 0)
    return <h1 className={styles.container + " bg-white"}>No Orders Yet</h1>;

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
                      width="100px"
                      height="100px"
                      className="zoom"
                    />
                  </Link>
                  {order.productName}
                </div>
              </td>
              <td>{order.date}</td>
              <td>{order.quantity}</td>
              <td>{(order.price * order.quantity).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
