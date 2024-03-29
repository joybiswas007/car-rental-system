import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [carData, setCarData] = useState([]);

  useEffect(() => {
    fetchCarData();
  }, []);

  const fetchCarData = async () => {
    try {
      const response = await axios.post("http://localhost:21000/api/cars");
      setCarData(response.data.data);
    } catch (error) {
      console.error("Failed to fetch car data:", error);
    }
  };

  const handleButtonClick = (modelId) => {
    const userChosenVeichle = carData.filter((car) => car.id === modelId);
    navigate("/rent", { state: { veichleInfo: userChosenVeichle } });
  };

  return (
    <div className="bg-white min-h-screen text-gray-800">
      <h1 className="text-3xl font-bold text-center p-4">
        Car Rental Services
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {carData.map((car) => (
          <div
            key={car.id}
            className="bg-white p-4 rounded-lg shadow-lg border border-gray-200"
          >
            <img
              src={car.imageURL}
              alt={car.make}
              className="w-full h-48 object-cover rounded-md"
            />
            <h2 className="text-xl font-semibold mt-2">
              {car.make} {car.model}
            </h2>
            <p className="text-gray-600">
              {car.year} - {car.type}
            </p>
            <p className="mt-2">
              Seats: {car.seats} | Bags: {car.bags}
            </p>
            <div className="mt-2">
              {car.features.map((feature, index) => (
                <span
                  key={index}
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-800 mr-2 mb-2"
                >
                  {feature}
                </span>
              ))}
            </div>
            <div className="flex justify-between items-center mt-4">
              <div>
                <p className="font-bold">Rates:</p>
                <p>Hourly: ${car.rates.hourly}</p>
                <p>Daily: ${car.rates.daily}</p>
                <p>Weekly: ${car.rates.weekly}</p>
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  handleButtonClick(car.id);
                }}
              >
                Rent Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
