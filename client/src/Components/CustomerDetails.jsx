const CustomerDetails = ({ customerDetails, handleCustomerInputChange }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900">Customer Details</h2>
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
  );
};

export default CustomerDetails;
