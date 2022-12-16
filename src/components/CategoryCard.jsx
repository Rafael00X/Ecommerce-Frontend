import React from "react";
import { Link } from "react-router-dom";

import imagePlaceholder from "../assets/img/image-placeholder.jpg";
import styles from "../styles/CategoryCard.module.css";

export default function CategoryCard(props) {
  const {
    category: { categoryId, categoryName, imageUrl },
  } = props;

  return (
    <div className={styles["category-card"]}>
      <Link to={`/category/${categoryId}`}>
        <img className="zoom" src={imageUrl || imagePlaceholder} alt="prduct" />
        <h5 className="ovf-ellipse">{categoryName}</h5>
      </Link>
    </div>
  );
}
