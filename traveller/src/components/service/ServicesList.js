import React from 'react';
import ServiceCard from './ServiceCard';

const ServicesList = ({ services }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-blue-600">Nearby Rentals & Services</h3>
      {services.map((service, index) => (
        <ServiceCard key={index} service={service} />
      ))}
    </div>
  );
};

export default ServicesList;
