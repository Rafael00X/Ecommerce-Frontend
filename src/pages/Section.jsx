import { useParams } from "react-router-dom";

export default function Section() {
  const { sectionId } = useParams();

  return (
    <div>
      <h1>Section Page {sectionId}</h1>
    </div>
  );
}
