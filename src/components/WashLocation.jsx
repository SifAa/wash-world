export default function WashLocation(data) {
  return (
    <button
      className="btn btn-wash btn-location"
      onClick={data.locationClicked}
      disabled={data.location.status !== "available" ? "on" : ""}
      value={data.location.id}
    >
      {data.location.name}
    </button>
  );
}
