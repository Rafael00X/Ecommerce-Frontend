import { useEffect, useState } from "react";

import SectionCard from "../components/SectionCard";
import { getAllSections } from "../utils/query.js";

export default function HomePage() {
  const [data, setData] = useState();

  useEffect(() => {
    getAllSections()
      .then((sections) => {
        setData(sections);
      })
      .catch((error) => console.log(error));
  }, []);

  if (!data) return <>Loading...</>;

  return (
    <div>
      {data.map((section) => (
        <SectionCard key={section.sectionId} section={section} />
      ))}
    </div>
  );
}
