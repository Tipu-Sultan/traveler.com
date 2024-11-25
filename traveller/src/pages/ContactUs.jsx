import React from 'react';
import Layout from '../layout/Layout';

const ContactUs = () => {
  return (
    <Layout>
      <div className="min-h-screen py-8  text-white">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl text-black font-bold mb-4">Get In Touch With Us</h1>
            <p className="text-lg max-w-2xl text-black mx-auto">
              We'd love to hear your thoughts, ideas, or feedback! Contact us for any inquiries, and we'll get back to you as soon as possible.
            </p>
          </div>

          {/* Contact Information */}
          <div className="mt-12 md:flex md:justify-between space-y-12 md:space-y-0">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-semibold mb-6 text-black">Our Contact Details</h2>
              <div className="space-y-6 text-gray-200">
                <div className="flex items-center space-x-3">
                  <span className="material-icons text-xl text-orange-500">location_on</span>
                  <p className='text-black'>Traveler.com Office: 123 Adventure Street, City, Country</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="material-icons text-xl text-orange-500">Email</span>
                  <p className='text-black'>
                    Email: <a href="mailto:info@traveler.com" className="hover:underline">info@traveler.com</a>
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="material-icons text-xl text-orange-500">phone</span>
                  <p className='text-black'>
                    Phone: <a href="tel:+11234567890" className="hover:underline">(123) 456-7890</a>
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="material-icons text-xl text-orange-500">business</span>
                  <p className='text-black'>Business Hours: Mon - Fri, 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:w-1/2">
              <h2 className="text-3xl font-semibold mb-6 text-black">Send Us a Message</h2>
              <form className="bg-white text-black p-8 rounded-lg shadow-lg">
                <div className="mb-6">
                  <label htmlFor="name" className="block text-black text-lg">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="email" className="block text-black text-lg">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Your email address"
                    required
                  />
                </div>

                <div className="mb-6 ">
                  <label htmlFor="message" className="block text-black text-lg">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Write your message here"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactUs;
