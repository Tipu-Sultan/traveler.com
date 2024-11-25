import React from 'react';

const Policies = ({ finalPlace }) => {
  return (
    <div>
      <h3 className="text-lg font-bold">Travel Policies</h3>
      
      {/* Refund Policy */}
      <p className="mt-2">
        <strong>Refund:</strong> {finalPlace.cancellationPolicy?.refundPercentage}% refund if canceled before the deadline.
      </p>

      {/* Cancellation Deadline */}
      <p className="mt-2">
        <strong>Cancellation Deadline:</strong> Cancellations must be made at least {finalPlace.cancellationPolicy?.deadlineInDays} days before the scheduled trip to be eligible for a refund.
      </p>

      {/* Refund Processing Time */}
      <p className="mt-2">
        <strong>Refund Processing Time:</strong> Once your cancellation is processed, the refund will be credited to your account within {finalPlace.cancellationPolicy?.refundProcessingTime} business days.
      </p>

      {/* Travel Insurance */}
      <p className="mt-2">
        <strong>Travel Insurance:</strong> We recommend purchasing travel insurance to cover unforeseen circumstances such as medical emergencies or travel disruptions.
      </p>

      {/* Non-refundable Fees */}
      <p className="mt-2">
        <strong>Non-refundable Fees:</strong> Please note that certain service fees (e.g., booking fees) are non-refundable even if the cancellation occurs before the deadline.
      </p>

      {/* Special Circumstances */}
      <p className="mt-2">
        <strong>Special Circumstances:</strong> In case of natural disasters, political unrest, or other unforeseen events, our cancellation policy may be subject to change. Please contact us for further details.
      </p>

      {/* Other Terms */}
      <p className="mt-2">
        <strong>Additional Terms:</strong> This policy is subject to change. Always refer to the official terms and conditions on our website before booking.
      </p>
    </div>
  );
};

export default Policies;
