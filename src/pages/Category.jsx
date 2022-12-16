import { useParams } from "react-router-dom";

export default function Category() {
  const categoryId = Number(useParams().categoryId);

  return (
    <div>
      <h1>Category Page {categoryId}</h1>
    </div>
  );
}
