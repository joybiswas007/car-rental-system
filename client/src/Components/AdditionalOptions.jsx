const AdditionalOptions = ({ reservationDetails, handleReservationInputChange }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-900">Additional Charges</h3>
      <div className="mt-2">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="tax"
            checked={reservationDetails.additionalOptions.tax}
            onChange={handleReservationInputChange}
          />
          <span>Tax (11.5%)</span>
        </label>
        <label className="flex items-center space-x-2 mt-2">
          <input
            type="checkbox"
            name="liabilityInsurance"
            checked={reservationDetails.additionalOptions.liabilityInsurance}
            onChange={handleReservationInputChange}
          />
          <span>Liability Insurance ($15)</span>
        </label>
        <label className="flex items-center space-x-2 mt-2">
          <input
            type="checkbox"
            name="collisionDamageWaiver"
            checked={reservationDetails.additionalOptions.collisionDamageWaiver}
            onChange={handleReservationInputChange}
          />
          <span>Collision Damage Waiver ($9)</span>
        </label>
      </div>
    </div>
  );
};

export default AdditionalOptions;
