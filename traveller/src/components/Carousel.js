// components/Carousel.js
import React from 'react';
import { Carousel } from 'react-responsive-carousel'; // Install this library if not already done

const PlaceCarousel = ({ images }) => {
  return (
    <Carousel showArrows={true} showThumbs={false} infiniteLoop={true} autoPlay={true}>
      {images?.map((img, index) => (
        <div key={index}>
          <img className='rounded-lg'  src={img} alt={`Place  ${index + 1}`} />
        </div>
      ))}
    </Carousel>
  );
};

export default PlaceCarousel;
