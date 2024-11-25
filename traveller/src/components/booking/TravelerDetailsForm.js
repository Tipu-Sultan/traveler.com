import React from 'react';

const TravelerDetailsForm = ({loading, travelerDetails, handleInputChange, handleConfirmBooking }) => (
  <div className="p-8 lg:col-span-2 flex flex-col justify-center">
    <h1 className="text-3xl font-semibold text-orange-500 text-center mb-8">Enter Traveler Details</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <label className="block">
        <span className="text-gray-700">Full Name</span>
        <input
          type="text"
          name="name"
          value={travelerDetails.name}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-sky-300 rounded-md shadow-sm focus:border-orange-400 focus:ring focus:ring-orange-200 focus:ring-opacity-50 p-2"
          placeholder="Amit Kumar Sign"
        />
      </label>
      <label className="block">
        <span className="text-gray-700">Email Address</span>
        <input
          type="email"
          name="email"
          value={travelerDetails.email}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-sky-300 rounded-md shadow-sm focus:border-orange-400 focus:ring focus:ring-orange-200 focus:ring-opacity-50 p-2"
          placeholder="amit1230@gmail.com"
        />
      </label>
      <label className="block">
        <span className="text-gray-700">Contact Number</span>
        <input
          type="text"
          name="contact"
          value={travelerDetails.contact}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-sky-300 rounded-md shadow-sm focus:border-orange-400 focus:ring focus:ring-orange-200 focus:ring-opacity-50 p-2"
          placeholder="1234567890"
        />
      </label>
      <label className="block">
        <span className="text-gray-700">Gender</span>
        <select
          name="gender"
          value={travelerDetails.gender}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-sky-300 rounded-md shadow-sm focus:border-orange-400 focus:ring focus:ring-orange-200 focus:ring-opacity-50 p-2"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </label>
    </div>
    <button
      onClick={handleConfirmBooking}
      className="mt-8 w-full bg-gradient-to-r from-orange-500 to-sky-500 text-white px-4 py-2 rounded hover:bg-gradient-to-l transition duration-300"
    >
      {loading==='creating'? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                <div className="w-4 h-4 bg-white rounded-full animate-pulse delay-180"></div>
                <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse delay-300"></div>
              </div>
            ) : (
              "Proceed to Payment"
            )}
    </button>
  </div>
);

export default TravelerDetailsForm;
