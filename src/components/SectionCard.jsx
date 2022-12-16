import React from "react";
import { Link } from "react-router-dom";

import CategoryCard from "./CategoryCard";
import styles from "../styles/SectionCard.module.css";

export default function SectionCard(props) {
  const {
    section: { sectionId, sectionName, categories },
  } = props;

  return (
    <div className={styles["section-card"]}>
      <div className={styles.header}>
        <h1>{sectionName}</h1>
        <Link to={"/section/" + sectionId} className="btn btn-primary">
          VIEW ALL
        </Link>
      </div>
      <hr />
      <div className={styles.slideshow}>
        {categories &&
          categories.map((category) => (
            <CategoryCard
              key={category.categoryId}
              data={category}
              height="350px"
              width="300px"
            />
          ))}
      </div>
    </div>
  );
}
