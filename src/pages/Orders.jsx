import { getOrders } from "../utils/query";
import OrderCard from "../components/cards/OrderCard";

export default function Order() {
  const orders = getOrders();
  return (
    <div>
      {orders.map((order) => (
        <OrderCard order={order} />
      ))}
    </div>
  );
}
