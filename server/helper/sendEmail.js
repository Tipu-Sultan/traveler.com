const nodemailer = require('nodemailer');
const UserModel = require('../models/UserModel');

// Create the transport for Nodemailer using your email provider's SMTP service
const transporter = nodemailer.createTransport({
  service: 'gmail', // Or use your email provider like 'smtp.mailtrap.io', 'sendgrid', etc.
  auth: {
    user: process.env.EMAIL_FROM, // Your email address (from which the email will be sent)
    pass: process.env.EMAIL_PASS, // Your email password or application-specific password
  },
});

// Email sending function (implement this function)
const sendVerificationEmail = async (email, token) => {
  const verificationLink = `${process.env.HOST}/verify?token=${token}`;

  // Use a mailing service or library to send the email
  const emailContent = `
      <h1>Email Verification</h1>
      <p>Hi,</p>
      <p>Thank you for registering. Please verify your email by clicking the link below:</p>
      <a href="${verificationLink}">Verify Email</a>
    `;

  await transporter.sendMail({
    to: email,
    subject: 'Email Verification',
    html: emailContent,
  });
};


// Email sending function for OTP
const sendOtpToEmail = async (email, otp) => {
  const emailContent = `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
      <h2 style="color: #333; text-align: center;">Password Reset OTP</h2>
      <p style="font-size: 16px; color: #333;">Hello,</p>
      <p style="font-size: 16px; color: #333;">
        You've requested to reset your password. Please use the following OTP to proceed with resetting your password:
      </p>
      <div style="text-align: center; font-size: 24px; color: #ffffff; background-color: #007bff; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <strong>${otp}</strong>
      </div>
      <p style="font-size: 16px; color: #333;">
        This OTP will expire in 10 minutes. Please make sure to enter it promptly.
      </p>
      <p style="font-size: 16px; color: #333;">
        If you did not request this, please ignore this email.
      </p>
      <p style="font-size: 16px; color: #333;">Thank you,</p>
      <p style="font-size: 16px; color: #333;">Traveler.com</p>
    </div>
  `;

  try {
    // Send email with OTP
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,  // Sender's email address
      to: email,                    // Receiver's email address
      subject: 'Password Reset OTP', // Subject of the email
      html: emailContent,           // HTML content of the email
    });

    return true;
  } catch (error) {
    console.error('Error sending OTP email:', error);
    return false; // Return false on failure
  }
};


// Helper function to send booking confirmation email
const sendEmailForConfirmedBooking = async (userEmail, bookingDetails) => {
  const { bookingId, package, travelDate, returnDate, numberOfPeople, numberOfRooms, totalCost, paymentMethod, user } = bookingDetails;
  const userDetails = await UserModel.findById(user).exec();

  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender email
    to: userEmail, // Recipient email (from booking details)
    subject: 'Booking Confirmation - Your Trip is Confirmed!',
    html: `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              width: 80%;
              margin: 0 auto;
              padding: 20px;
              border: 1px solid #ddd;
              border-radius: 8px;
              background-color: #f9f9f9;
            }
            h1 {
              text-align: center;
              color: #4CAF50;
            }
            .details {
              margin-top: 20px;
              padding: 10px;
              background-color: #fff;
              border: 1px solid #ddd;
              border-radius: 4px;
            }
            .details div {
              margin-bottom: 10px;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              font-size: 14px;
            }
            .btn {
              display: inline-block;
              padding: 10px 20px;
              background-color: #4CAF50;
              color: white;
              text-decoration: none;
              border-radius: 5px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Booking Confirmed!</h1>
            <h3>Hello ${userDetails.name},</h3>
            <p>We are happy to inform you that your booking has been confirmed. Below are your booking details:</p>

            <div class="details">
              <div><strong>Booking ID:</strong> ${bookingId}</div>
              <div><strong>Package:</strong> ${package}</div>
              <div><strong>Travel Date:</strong> ${new Date(travelDate).toLocaleDateString()}</div>
              <div><strong>Return Date:</strong> ${returnDate ? new Date(returnDate).toLocaleDateString() : 'N/A'}</div>
              <div><strong>Number of People:</strong> ${numberOfPeople}</div>
              <div><strong>Number of Rooms:</strong> ${numberOfRooms}</div>
              <div><strong>Total Cost:</strong> $${totalCost}</div>
              <div><strong>Payment Method:</strong> ${paymentMethod}</div>
            </div>

            <p>We look forward to serving you. If you have any questions, feel free to reach out.</p>

            <p class="footer">Thank you for booking with us!<br />If you need any assistance, feel free to contact us.</p>

            <p class="footer"><a href="https://travellercom.vercel.app/" class="btn">Visit Our Website</a></p>
          </div>
        </body>
      </html>
    `,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    console.log(`Booking confirmation email sent to ${userEmail}`);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Email could not be sent');
  }
};

module.exports = { sendVerificationEmail, sendOtpToEmail,sendEmailForConfirmedBooking };
