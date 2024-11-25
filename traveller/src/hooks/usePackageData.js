import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeaturedPlaces, fetchPlace, fetchPlaceServices } from '../redux/slices/placeSlice';

const usePackageData = (packageId = null) => {
    const dispatch = useDispatch();

    const {
        place,
        featuredPlace,
        loading,
        error,
        nearbyHotels,
        bikesorCar,
        petrolStations
    } = useSelector((state) => state.place);

    const { results } = useSelector((state) => state.search);
    // Determine the appropriate place data to use (from search, featured, or directly fetched place)
    const dataFromSearch = results?.find((search) => search.packageId === packageId);
    const dataFromFeatured = featuredPlace?.find((search) => search.packageId === packageId);

    const finalPlace = packageId ? (dataFromSearch || dataFromFeatured || place) : featuredPlace;

    const packageCity = finalPlace?.locations?.city;

    // Check if there is a matching locationName or location.city in either array
    const checkCity = [...bikesorCar, ...nearbyHotels].some(
        (item) => item.locationName === packageCity || item.location?.city === packageCity
    );

    // Fetch featured places if no specific packageId is provided
    useEffect(() => {
        if (!packageId && (!featuredPlace || featuredPlace.length === 0)) {
            dispatch(fetchFeaturedPlaces());
        }
    }, [dispatch, featuredPlace, packageId]);

    // Fetch specific place details when packageId is provided and place data isn't loaded
    useEffect(() => {
        if (packageId && (!place || place.packageId !== packageId)) {
            dispatch(fetchPlace(packageId));
        }
    }, [dispatch, packageId, place]);

    // Fetch additional services when finalPlace is available and service lists are empty
    useEffect(() => {
        if (packageId && finalPlace && finalPlace.locations &&
            (nearbyHotels.length === 0 || bikesorCar.length === 0 || !checkCity)) {
            dispatch(fetchPlaceServices({ packageId, city: finalPlace.locations.city }));
        }
    }, [bikesorCar.length, checkCity, dispatch, finalPlace, nearbyHotels.length, packageId]);

    return {
        featuredPlace,
        place,
        finalPlace,
        nearbyHotels,
        bikesorCar,
        petrolStations,
        loading,
        error,
    };
};

export default usePackageData;
