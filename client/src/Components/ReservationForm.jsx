import { useState } from "react";
import axios from "axios";
import CustomerDetailsForm from "./CustomerDetails";
import ReservationDetailsForm from "./ReservationDetails";
import AdditionalOptionsForm from "./AdditionalOptions";
import VehicleDetails from "./VehicleDetails";
import ChargesSummary from "./ChargesSummary";
import GeneratePDF from "../utils/PDFGenerator";

const ReservationForm = ({ userChosenVehicle }) => {
  const vehicle = userChosenVehicle[0];
  const { type, make, rates } = vehicle;
  const { hourly, daily, weekly } = rates;

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
    vehicle: {
      type: type || "",
      make: make || "",
    },
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
      const total = calculatePrice();
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
          total: total ? total.toString() : "0",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.statusCode !== 200) {
        console.log("error");
      }

      const pdf = GeneratePDF(
        reservationDetails,
        customerDetails,
        rates,
        calculatePrice,
        calculateTotalPrice,
        response.data.orderId
      );
      pdf.save(`Reservation_RA${response.data.orderId}.pdf`);
    } catch (error) {
      console.error("Error submitting rental order:", error.message);
    }
  };

  return (
    <div className="mx-auto p-6 bg-white rounded-lg shadow-xl">
      <div className="flex justify-start mb-6 text-2xl font-bold text-gray-800">
        Reservation information
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
          <ReservationDetailsForm
            reservationDetails={reservationDetails}
            handleReservationInputChange={handleReservationInputChange}
          />
        </section>
        <section className="col-span-2">
          <div className="grid grid-cols-2 gap-6">
            <CustomerDetailsForm
              customerDetails={customerDetails}
              handleCustomerInputChange={handleCustomerInputChange}
            />
            <AdditionalOptionsForm
              reservationDetails={reservationDetails}
              handleReservationInputChange={handleReservationInputChange}
            />
          </div>
        </section>
      </div>
      <div className="flex justify-between items-center mt-6">
        <section className="w-1/3">
          <VehicleDetails reservationDetails={reservationDetails} />
        </section>
        <section className="w-1/2">
          <ChargesSummary
            reservationDetails={reservationDetails}
            calculateDuration={calculateDuration}
            calculatePrice={calculatePrice}
            calculateAdditionalCharges={calculateAdditionalCharges}
            calculateTotalPrice={calculateTotalPrice}
          />
        </section>
      </div>
    </div>
  );
};

export default ReservationForm;
