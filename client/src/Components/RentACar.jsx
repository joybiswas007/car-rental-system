import { useLocation } from "react-router-dom";
import ReservationForm from "./ReservationForm";

function RentACar() {
  const location = useLocation();
  const userChosenVeichle = location.state?.veichleInfo;
  return (
    <>
      <ReservationForm userChosenVehicle={userChosenVeichle} />
    </>
  );
}

export default RentACar;
