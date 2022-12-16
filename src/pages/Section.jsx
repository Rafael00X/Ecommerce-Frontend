import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getSection } from "../utils/query";
import CategoryCard from "../components/CategoryCard";

export default function Section() {
  const [section, setSection] = useState();
  const sectionId = Number(useParams().sectionId);

  useEffect(() => {
    getSection(sectionId)
      .then((section) => setSection(section))
      .catch((err) => console.log(err));
  }, [sectionId]);

  if (!section) return <>Loading...</>;

  return (
    <div>
      {section.categories.map((category) => (
        <CategoryCard
          key={category.categoryId}
          data={category}
          height="350px"
          width="300px"
        />
      ))}
    </div>
  );
}
