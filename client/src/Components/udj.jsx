import { useState } from "react";
import PropTypes from 'prop-types';

const ReservationForm = ({ userChosenVehicle }) => {
  const [reservationDetails, setReservationDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    pickupDate: "",
    returnDate: "",
    rentalType: "hourly",
    additionalCharges: {
      collisionDamage: false,
      liabilityInsurance: false,
      rentalTax: false,
    },
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setReservationDetails({
        ...reservationDetails,
        additionalCharges: {
          ...reservationDetails.additionalCharges,
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
    const duration = calculateDuration();
    let price = 0;
    const rates = { hourly: 10, daily: 50, weekly: 200 };
    switch (reservationDetails.rentalType) {
      case "hourly":
        price = duration * 24 * rates.hourly;
        break;
      case "daily":
        price = duration * rates.daily;
        break;
      case "weekly":
        price = Math.ceil(duration / 7) * rates.weekly;
        break;
      default:
        price = 0;
    }
    return price;
  };

  const vehicle = userChosenVehicle[0] || {};

  return (
    <form className="container mx-auto p-6 bg-white shadow-md">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <h2 className="text-lg font-semibold mb-3">Reservation Details</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pickupDate">Pickup Date</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="pickupDate" type="date" name="pickupDate" value={reservationDetails.pickupDate} onChange={handleInputChange} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="returnDate">Return Date</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="returnDate" type="date" name="returnDate" value={reservationDetails.returnDate} onChange={handleInputChange} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rentalType">Rental Type</label>
            <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" id="rentalType" name="rentalType" value={reservationDetails.rentalType} onChange={handleInputChange}>
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>
          <div className="mb-4">
            <p className="text-gray-700">Duration: {calculateDuration()} days</p>
            <p className="text-gray-700">Total Price: ${calculatePrice()}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="vehicleType">Vehicle Type</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="vehicleType" type="text" name="vehicleType" value={vehicle.type || ''} readOnly />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="vehicleModel">Vehicle Model</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="vehicleModel" type="text" name="vehicleModel" value={`${vehicle.make || ''} ${vehicle.model || ''}`} readOnly />
          </div>
        </div>
        <div className="w-full md:w-1/2 px-3">
          <h2 className="text-lg font-semibold mb-3">Customer Information</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">First Name</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="firstName" type="text" name="firstName" placeholder="Enter First Name" value={reservationDetails.firstName} onChange={handleInputChange} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">Last Name</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastName" type="text" name="lastName" placeholder="Enter Last Name" value={reservationDetails.lastName} onChange={handleInputChange} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" name="email" placeholder="Enter Email" value={reservationDetails.email} onChange={handleInputChange} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">Phone Number</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="phoneNumber" type="text" name="phoneNumber" placeholder="Enter Phone Number" value={reservationDetails.phoneNumber} onChange={handleInputChange} />
          </div>
        </div>
      </div>
    </form>
  );
};

ReservationForm.propTypes = {
  userChosenVehicle: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
    make: PropTypes.string,
    model: PropTypes.string,
  })).isRequired,
};

export default ReservationForm;

