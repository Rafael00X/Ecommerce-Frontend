import { useParams } from "react-router-dom";

export default function Product() {
  const productId = Number(useParams().productId);

  return (
    <div>
      <h1>Product Page {productId}</h1>
    </div>
  );
}
