const ChargesSummary = ({ calculateDuration, calculatePrice, calculateAdditionalCharges, calculateTotalPrice }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-900">Charges Summary</h3>
      <div className="text-gray-700">
        <p>Duration: {calculateDuration()} days</p>
        <p>Base Price: ${calculatePrice().toFixed(2)}</p>
        <p>
          Additional Charges: ${calculateAdditionalCharges().toFixed(2)}
        </p>
        <p className="font-medium">
          Total Price: ${calculateTotalPrice()}
        </p>
      </div>
    </div>
  );
};

export default ChargesSummary;
