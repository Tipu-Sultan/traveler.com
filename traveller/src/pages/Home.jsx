import React, { useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Layout from '../layout/Layout';
import {FeaturedDestinations} from '../components/FeaturedDestinations';
import Spinner from '../components/Spinner';
import usePackageData from '../hooks/usePackageData';


const Home = () => {
  const { featuredPlace, loading, error } = usePackageData();



  // Filter by categories
  // const bestRatedPlaces = featuredPlace.filter(place => place.ratings.overall > 4.8);
  // const seasonBasedPlaces = featuredPlace.filter(place =>
  //   place.best_time_to_visit && seasonMonths.some(month => place.best_time_to_visit.includes(month))
  // );

  return (
    <Layout title="Home | Traveller.com" description="Explore the best destinations with Traveller.com">
      <div>
        <header className="relative h-80">
          <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} className="carousel-wrapper">
            <div className="h-80 overflow-hidden">
              <img src="https://images.lifestyleasia.com/wp-content/uploads/sites/7/2022/03/31174154/Hidden-Gems-Himachal.jpg" alt="Destination 1" className="object-cover w-full h-full" />
              <p className="legend">Explore the mountains of Himachal</p>
            </div>
          </Carousel>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-40">
            <h1 className="text-4xl font-bold text-center">Explore Your Next Adventure</h1>
            <p className="mt-4 text-lg text-center">Discover the best places, hotels, and services for your travel.</p>
          </div>
        </header>
        <SearchBar />

        {/* Featured Destinations Section */}
        <section className="my-8 max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-orange-500 mb-6">Featured Destinations</h2>
          {loading && <Spinner />}

          {/* Error Message */}
          {error && (
            <div className="flex items-center justify-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6" role="alert">
              <svg className="w-5 h-5 mr-2 text-red-700" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v4a1 1 0 102 0V7zm-1 8a1 1 0 110-2 1 1 0 010 2z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Oops! Something went wrong:</span> {error}
            </div>
          )}

          {/* Best Ratings */}
          <div className="my-8">
            <h3 className="text-xl font-semibold text-blue-500 mb-4">Best Ratings ⭐</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPlace.map((destination) => (
                <FeaturedDestinations key={destination._id} destination={destination} />
              ))}
            </div>
          </div>

          {/* Best Season to Visit */}
        </section>

      </div>
    </Layout>
  );
};

export default Home;
