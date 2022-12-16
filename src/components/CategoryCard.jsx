import React from "react";
import { Link } from "react-router-dom";

import imagePlaceholder from "../assets/img/image-placeholder.jpg";
import styles from "../styles/CategoryCard.module.css";

export default function CategoryCard(props) {
  const {
    data: { categoryId, categoryName, imageUrl },
    height,
    width,
  } = props;

  return (
    <Link className={styles["category-card"]} to={`/category/${categoryId}`}>
      <img
        className="zoom"
        height={height}
        width={width}
        src={imageUrl || imagePlaceholder}
        alt="prduct"
      />
      <div>
        <h5>{categoryName}</h5>
      </div>
    </Link>
  );
}
