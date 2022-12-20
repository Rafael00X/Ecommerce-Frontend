import styles from "./OrderCard.module.css";

export default function OrderCard(props) {
  const { order } = props;
  return (
    <div>
      <h3>{order.productName}</h3>
      <p>{order.date}</p>
      <p>{order.quantity}</p>
    </div>
  );
}
