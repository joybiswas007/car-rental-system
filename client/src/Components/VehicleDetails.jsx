const VehicleDetails = ({ reservationDetails }) => {
  const { type, make } = reservationDetails.vehicle;
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-800">Vehicle</h3>
      <div className="mt-1 space-y-1">
        <p className="form-input px-2 py-1 border rounded-lg w-full mt-2">
          Type: {type}
        </p>
        <p className="form-input px-2 py-1 border rounded-lg w-full mt-2">
          Name: {make}
        </p>
      </div>
    </div>
  );
};

export default VehicleDetails;
