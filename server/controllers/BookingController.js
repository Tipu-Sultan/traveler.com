const { sendEmailForConfirmedBooking } = require('../helper/sendEmail');
const Booking = require('../models/Booking');  // Assuming bookingSchema is in models folder


exports.createBooking = async (req, res) => {
  try {
    const { startPoint, endPoint, bookingId, package, userId, packageId, bookingDate, travelDate, numberOfPeople, numberOfRooms, hotelName, commuteType, travelersDetails, totalCost } = req.body;

    // Check if the user already has a booking for the same package
    const existingBooking = await Booking.findOne({ user: userId, packageId });

    if (existingBooking) {
      // If the booking already exists, update the relevant fields
      existingBooking.startPoint = startPoint || existingBooking.startPoint;
      existingBooking.endPoint = endPoint || existingBooking.endPoint;
      existingBooking.bookingId = bookingId || existingBooking.bookingId;
      existingBooking.bookingDate = bookingDate || existingBooking.bookingDate;
      existingBooking.travelDate = travelDate || existingBooking.travelDate;
      existingBooking.numberOfPeople = numberOfPeople || existingBooking.numberOfPeople;
      existingBooking.numberOfRooms = numberOfRooms || existingBooking.numberOfRooms;
      existingBooking.hotelName = hotelName || existingBooking.hotelName;
      existingBooking.commuteType = commuteType || existingBooking.commuteType;
      existingBooking.travelersDetails = travelersDetails || existingBooking.travelersDetails;
      existingBooking.totalCost = totalCost || existingBooking.totalCost;

      // Save the updated booking
      const updatedBooking = await existingBooking.save();

      return res.status(200).json({
        success: true,
        message: 'Booking updated successfully.',
        booking: updatedBooking,
      });
    } else {
      // If no existing booking, create a new one
      const newBooking = new Booking({
        startPoint,
        endPoint,
        bookingId,
        user: userId,
        packageId,
        package,
        bookingDate,
        travelDate,
        numberOfPeople: numberOfPeople || 1,
        numberOfRooms: numberOfRooms || 0,
        hotelName: hotelName || '',
        commuteType: commuteType || 'none',
        travelersDetails,
        totalCost,
        paymentStatus: 'Pending',  // Default as 'Pending' until payment is confirmed
        bookingStatus: 'Pending',  // Initial status as 'Pending'
      });

      // Save the new booking in the database
      const savedBooking = await newBooking.save();
      return res.status(201).json({
        success: true,
        message: 'Booking created successfully. Please proceed to payment.',
        booking: savedBooking,
      });
    }
  } catch (error) {
    console.error('Error creating or updating booking:', error);
    res.status(500).json({ success: false, message: 'Failed to create or update booking.' });
  }
};


exports.updateBookingAfterPayment = async (req, res) => {
  try {
    const { bookingId, paymentStatus, paymentId, signature, paymentMethod } = req.body;

    // Find the booking by ID and update the status and payment details
    const updatedBooking = await Booking.findOneAndUpdate(
      { bookingId },
      {
        paymentStatus,
        bookingStatus: paymentStatus === 'Completed' ? 'Confirmed' : 'Pending',
        paymentId,
        paymentMethod,
        paymentSignature: signature,
        updatedAt: Date.now(),
      },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ success: false, message: 'Booking not found.' });
    }

    // Send email for confirmed booking if payment is successful
    if (paymentStatus === 'Completed') {
      await sendEmailForConfirmedBooking(updatedBooking.travelersDetails.email, updatedBooking);
    }

    res.status(200).json({
      success: true,
      message: 'Booking updated successfully after payment.',
      booking: updatedBooking,
    });
  } catch (error) {
    console.error('Error updating booking after payment:', error);
    res.status(500).json({ success: false, message: 'Failed to update booking after payment.' });
  }
};


exports.getBookingDetails = async (req, res) => {
    try {
      const { bookingId } = req.params;
  
      // Find the booking by bookingId
      const booking = await Booking.findOne({ bookingId });
  
      if (!booking) {
        return res.status(404).json({ success: false, message: 'Booking not found.' });
      }
  
      res.status(200).json({
        success: true,
        message: 'Booking details retrieved successfully.',
        booking,
      });
    } catch (error) {
      console.error('Error retrieving booking details:', error);
      res.status(500).json({ success: false, message: 'Failed to retrieve booking details.' });
    }
  };
  
