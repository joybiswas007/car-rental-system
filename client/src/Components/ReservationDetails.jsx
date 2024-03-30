const ReservationDetails = ({
  reservationDetails,
  handleReservationInputChange,
}) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900">
        Reservation Details
      </h2>
      <div className="mt-2">
        <input
          className="form-input px-2 py-1 border rounded-lg w-full"
          type="date"
          name="pickupDate"
          placeholder="Pickup Date"
          value={reservationDetails.pickupDate}
          onChange={handleReservationInputChange}
        />
        <input
          className="form-input px-2 py-1 border rounded-lg w-full mt-2"
          type="date"
          name="returnDate"
          placeholder="Return Date"
          value={reservationDetails.returnDate}
          onChange={handleReservationInputChange}
        />
        <select
          className="form-select px-2 py-1 border rounded-lg w-full mt-2"
          name="rentalType"
          value={reservationDetails.rentalType}
          onChange={handleReservationInputChange}
        >
          <option value="Hourly">Hourly</option>
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
        </select>
      </div>
    </div>
  );
};

export default ReservationDetails;
