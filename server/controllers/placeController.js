const Package = require('../models/packageModel'); 
const Hotel = require('../models/HotelsModel'); // Hotel model
const BikeRental = require('../models/BikeRentalModel'); // BikeRental model
const State = require('../models/LocationsModel');


const getSearchPlaces = async (req, res) => {
  const { query, page = 1, limit = 10 } = req.query; // Default to page 1 and limit 10

  if (!query) {
    return res.status(400).json({ error: 'Search term is required' });
  }

  try {
    // Convert page and limit to integers
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    // Calculate the number of results to skip
    const skip = (pageNumber - 1) * limitNumber;

    // Build regex for partial and case-insensitive matching
    const regex = new RegExp(query, 'i'); // 'i' for case-insensitive

    // Search for packages that match the query in the name, state, or city
    const packages = await Package.find({
      $or: [
        { name: regex },
        { 'locations.state': regex },
        { 'locations.city': regex }
      ]
    }).skip(skip).limit(limitNumber);

    // Check if packages were found
    if (packages.length === 0) {
      return res.status(404).json({ error: 'No packages found matching the search criteria' });
    }

    // Get the total number of matching packages to calculate total pages
    const totalPackages = await Package.countDocuments({
      $or: [
        { name: regex },
        { 'locations.state': regex },
        { 'locations.city': regex }
      ]
    });

    // Calculate total pages
    const totalPages = Math.ceil(totalPackages / limitNumber);

    // Send the found packages along with pagination details
    res.status(200).json({
      packages,
      totalPages,
      currentPage: pageNumber,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


const getSuggestions = async (req, res) => {
  const { query } = req.query;

  // Validate that the query parameter is present
  if (!query || query.trim() === '') {
    return res.status(400).json({ error: 'Query parameter is required and cannot be empty' });
  }

  try {
    // Sanitize the query to prevent issues with regex
    const sanitizedQuery = query.trim().replace(/[.*+?^=!:${}()|\[\]\/\\]/g, "\\$&"); // Escape special regex characters
    const regex = new RegExp(sanitizedQuery, 'i'); // Create case-insensitive regex

    // Fetch the states matching the query
    const suggestions = await State.find({ state: regex })
      .limit(10)  // Limit the number of results
      .select('state cities -_id');  // Only return 'name' and 'cities', exclude '_id'

    // If no suggestions found, return a 404 error
    if (suggestions.length === 0) {
      return res.status(404).json({ message: 'No suggestions found' });
    }

    // Map the results to return a cleaner structure
    const result = suggestions.map((state) => ({
      state: state,
    }));

    // Return the suggestions as a JSON response
    res.json(result);
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    // Return a 500 error with a descriptive message
    res.status(500).json({ error: 'An error occurred while fetching suggestions', details: error.message });
  }
};


const getPlaceById = async (req, res) => {
  const { packageId } = req.params; 

  try {
      const package = await Package.findOne({ packageId: packageId }); 

      if (!package) {
          return res.status(404).json({ error: "Package not found" }); 
      }

      res.status(200).json(package); 
  } catch (error) {
      console.error("Error fetching place by ID:", error);
      res.status(500).json({ error: "Server error" }); // Return server error if any
  }
};

const getHotelById = async (req, res) => {
  const { hotelId } = req.params; // Extract placeId from request parameters

  try {
      const hotel = await Hotel.findOne({ hotel_id: hotelId }); // Find place by place_id

      if (!hotel) {
          return res.status(404).json({ error: "Hotel not found" }); // Return 404 if place not found
      }

      res.status(200).json(hotel); // Return place data if found
  } catch (error) {
      console.error("Error fetching place by ID:", error);
      res.status(500).json({ error: "Server error" }); // Return server error if any
  }
};

const getRentalById = async (req, res) => {
  const { rentalId } = req.params; // Extract placeId from request parameters

  try {
      const bikeRental = await BikeRental.findOne({ bike_rental_id: rentalId }); // Find place by place_id

      if (!bikeRental) {
          return res.status(404).json({ error: "Bike Rental not found" }); // Return 404 if place not found
      }

      res.status(200).json(bikeRental); // Return place data if found
  } catch (error) {
      console.error("Error fetching place by ID:", error);
      res.status(500).json({ error: "Server error" }); // Return server error if any
  }
};

// Controller to fetch place data with nearby hotels, bike rentals, and petrol stations
const getPlaceWithNearbyServices = async (req, res) => {
  try {
      const { packageId, city } = req.query;
      // 1. Find place based on placeId, name, or city
      let placeQuery = {};
      if (packageId) {
          placeQuery.packageId = packageId; // Use place_id instead of _id
      } else if (city) {
          placeQuery["locations.city"] = city;
      }

      // 2. Search for hotels and bike rentals in the same city as the place
      const hotelsPromise = Hotel.find({ "location.city": city });
      const bikeRentalsPromise = BikeRental.find({ "locationName": city });

      const [hotels, bikeRentals] = await Promise.all([
          hotelsPromise,
          bikeRentalsPromise,
      ]);

      // 3. Combine results and respond
      const response = {
          nearbyHotels: hotels,
          nearbyBikeRentals: bikeRentals,
      };

      res.status(200).json(response);
  } catch (error) {
      console.error("Error fetching place data:", error);
      res.status(500).json({ message: "Server error" });
  }
};

// Fetch Featured Places based on Season
const fetchFeaturedPlaces = async (req, res) => {
  try {
    const packages = await Package.find({ 'ratings.overall': { $gt: 4.6 } });

    // Check if places were found
    if (!packages || packages.length === 0) {
      return res.status(404).json({ message: 'No places found with rating above 4.3.' });
    }

    // Respond with the fetched places
    res.status(200).json(packages);
  } catch (error) {
    console.error("Error fetching featured places:", error);
    res.status(500).json({ error: 'Error fetching featured places' });
  }
};



module.exports = {
  getSearchPlaces,
  getPlaceWithNearbyServices,
  getPlaceById,
  getHotelById,
  getRentalById,
  fetchFeaturedPlaces,
  getSuggestions
};
