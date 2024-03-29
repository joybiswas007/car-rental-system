import { useState } from "react";
import axios from "axios";

const ReservationForm = ({ userChosenVehicle }) => {
  const vehicle = userChosenVehicle[0];
  const { type, make, rates } = vehicle;

  const [customerDetails, setCustomerDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    number: "",
  });

  const [reservationDetails, setReservationDetails] = useState({
    pickupDate: "",
    returnDate: "",
    rentalType: "Hourly",
    vehicleType: type || "",
    vehicleName: make || "",
    additionalOptions: {
      tax: false,
      liabilityInsurance: false,
      collisionDamageWaiver: false,
    },
  });

  const handleCustomerInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails({
      ...customerDetails,
      [name]: value,
    });
  };

  const handleReservationInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setReservationDetails({
        ...reservationDetails,
        additionalOptions: {
          ...reservationDetails.additionalOptions,
          [name]: checked,
        },
      });
    } else {
      setReservationDetails({
        ...reservationDetails,
        [name]: value,
      });
    }
  };

  const calculateDuration = () => {
    const pickupDate = new Date(reservationDetails.pickupDate);
    const returnDate = new Date(reservationDetails.returnDate);
    const duration = Math.ceil(
      (returnDate - pickupDate) / (1000 * 60 * 60 * 24)
    ); // in days
    return duration;
  };

  const calculatePrice = () => {
    const { hourly, daily, weekly } = rates;

    const duration = calculateDuration();
    let price = 0;
    switch (reservationDetails.rentalType) {
      case "Hourly":
        price = duration * 24 * hourly;
        break;
      case "Daily":
        price = duration * daily;
        break;
      case "Weekly":
        price = Math.ceil(duration / 7) * weekly;
        break;
      default:
        price = 0;
    }
    return price;
  };

  const calculateAdditionalCharges = () => {
    let additionalCharges = 0;
    if (reservationDetails.additionalOptions.tax) {
      additionalCharges += calculatePrice() * 0.115; // 11.5% tax
    }
    if (reservationDetails.additionalOptions.liabilityInsurance) {
      additionalCharges += 15; // $15 liability insurance
    }
    if (reservationDetails.additionalOptions.collisionDamageWaiver) {
      additionalCharges += 9; // $9 collision damage waiver
    }
    return additionalCharges;
  };

  const calculateTotalPrice = () => {
    let basePrice = calculatePrice();
    let additionalCharges = calculateAdditionalCharges();
    return basePrice + additionalCharges;
  };

  const handlePrintDownload = async () => {
    try {
      const { pickupDate, returnDate, rentalType } = reservationDetails;
      const { firstName, lastName, email, number } = customerDetails;
      const response = await axios.post(
        "http://localhost:21000/api/rentacar",
        {
          pickupDate,
          returnDate,
          rentType: rentalType,
          firstName,
          lastName,
          email,
          phone: number,
          carType: type,
          carName: make,
          total: calculatePrice().toString(),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.statusCode === 200) {
        console.log("Success:", response.data.message);
      } else {
        console.error("error");
      }
    } catch (error) {
      console.error("Error submitting rental order:", error.message);
    }
  };
  
  return (
    <div className="mx-auto p-6 bg-white rounded-lg shadow-xl">
      <div className="flex justify-start mb-6 text-2xl font-bold text-gray-800">
        Reserve information
      </div>
      <div className="flex justify-end mb-6">
        <button
          onClick={handlePrintDownload}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow"
        >
          Print/Download
        </button>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <section className="col-span-1">
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
        </section>
        <section className="col-span-2">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Customer Details
              </h2>
              <div className="mt-2">
                <input
                  className="form-input px-2 py-1 border rounded-lg w-full"
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={customerDetails.firstName}
                  onChange={handleCustomerInputChange}
                />
                <input
                  className="form-input px-2 py-1 border rounded-lg w-full mt-2"
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={customerDetails.lastName}
                  onChange={handleCustomerInputChange}
                />
                <input
                  className="form-input px-2 py-1 border rounded-lg w-full mt-2"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={customerDetails.email}
                  onChange={handleCustomerInputChange}
                />
                <input
                  className="form-input px-2 py-1 border rounded-lg w-full mt-2"
                  type="text"
                  name="number"
                  placeholder="Phone Number"
                  value={customerDetails.number}
                  onChange={handleCustomerInputChange}
                />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                Additional Charges
              </h3>
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
                    checked={
                      reservationDetails.additionalOptions.liabilityInsurance
                    }
                    onChange={handleReservationInputChange}
                  />
                  <span>Liability Insurance ($15)</span>
                </label>
                <label className="flex items-center space-x-2 mt-2">
                  <input
                    type="checkbox"
                    name="collisionDamageWaiver"
                    checked={
                      reservationDetails.additionalOptions.collisionDamageWaiver
                    }
                    onChange={handleReservationInputChange}
                  />
                  <span>Collision Damage Waiver ($9)</span>
                </label>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="flex justify-between items-center mt-6">
        <section className="w-1/3">
          <div>
            <h3 className="text-lg font-medium text-gray-800">Vehicle</h3>
            <div className="mt-1 space-y-1">
              <p className="form-input px-2 py-1 border rounded-lg w-full mt-2">
                Type: {reservationDetails.vehicleType}
              </p>
              <p className="form-input px-2 py-1 border rounded-lg w-full mt-2">
                Name: {reservationDetails.vehicleName}
              </p>
            </div>
          </div>
        </section>
        <section className="w-1/2">
          <h3 className="text-xl font-semibold text-gray-900">
            Charges Summary
          </h3>
          <div className="text-gray-700">
            <p>Duration: {calculateDuration()} days</p>
            <p>Base Price: ${calculatePrice().toFixed(2)}</p>
            <p>
              Additional Charges: ${calculateAdditionalCharges().toFixed(2)}
            </p>
            <p className="font-medium">
              Total Price: ${calculateTotalPrice().toFixed(2)}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ReservationForm;
