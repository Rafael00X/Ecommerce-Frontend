import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
      <h1>Category Page {categoryId}</h1>
      {category.products.map((product) => {
        return (
          <div>
            <p>{product.name}</p>
            <img src={product.imageUrl} />
            <p>{product.price}</p>
            <p>{product.discount}</p>
          </div>
        );
      })}
    </div>
  );
}
