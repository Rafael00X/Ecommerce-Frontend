import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CategoryCard from "../components/CategoryCard";
import { getSection } from "../utils/query.js";

export default function SectionPage() {
  const [section, setSection] = useState(null);
  const sectionId = Number(useParams().sectionId);

  useEffect(() => {
    getSection(sectionId)
      .then((section) => setSection(section))
      .catch((error) => console.log(error));
  }, [sectionId]);

  if (!section) return <>Loading...</>;

  return (
    <>
      <div
        className="display-container bg-white"
        style={{ textAlign: "start" }}
      >
        <div className="row">
          {section.categories.map((category) => (
            <div
              key={category.categoryId}
              className="col col-md-4 col-lg-3"
              style={{ padding: "10px" }}
            >
              <CategoryCard category={category} height="350px" width="350px" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
