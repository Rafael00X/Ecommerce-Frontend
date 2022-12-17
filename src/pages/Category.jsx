import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import { getCategory } from "../utils/query";

export default function Category() {
  const [category, setCategory] = useState(null);
  const categoryId = Number(useParams().categoryId);

  useEffect(() => {
    getCategory(categoryId)
      .then((category) => setCategory(category))
      .catch((error) => console.log(error));
  }, [categoryId]);

  if (!category) return <>Loading...</>;

  return (
    <div>
      {category.products.map((product) => {
        return <ProductCard key={product.productId} product={product} />;
      })}
    </div>
  );
}
