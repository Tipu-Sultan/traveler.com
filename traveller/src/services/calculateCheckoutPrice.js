// src/helpers/calculateCheckoutPrice.js
const calculateCheckoutPrice = (basePrice, travelers, extraRooms) => {
    return basePrice * travelers + (extraRooms * 50);
};

export default calculateCheckoutPrice;
