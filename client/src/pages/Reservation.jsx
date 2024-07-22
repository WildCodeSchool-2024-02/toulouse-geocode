import { useLocation } from "react-router-dom";

function Reservation() {
  const location = useLocation();

  return (
    <>
      <p>{location?.state?.startingDate}</p>
      <p>{location?.state?.endingDate}</p>
      <p>{location?.state?.userId}</p>
      <p>{location?.state?.stationId}</p>
    </>
  );
}

export default Reservation;
