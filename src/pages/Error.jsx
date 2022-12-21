export default function Error(props) {
  const info = props.info;
  if (info === "invalid")
    return (
      <div>
        <h1>Invalid URL</h1>
      </div>
    );
  else
    return (
      <div>
        <h1>Unauthorized Access</h1>
      </div>
    );
}
