import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SearchBar from '../components/SearchBar';
import DestinationCard from '../components/DestinationCard';
import Layout from '../layout/Layout';
import DynamicBreadcrumbs from '../components/Breadcrumbs';
import Spinner from '../components/Spinner';
import { useLocation } from 'react-router-dom';
import { search } from '../redux/slices/searchSlice';

const SearchResults = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const searchParams = new URLSearchParams(location.search);
  const queryParam = searchParams.get('end');
  const { results, loading, searchError, totalPages, currentPage } = useSelector(state => state.search);

  const handlePageChange = (page) => {
    dispatch(search({ query: queryParam, page: page }));
  };


  return (
    <Layout title="Search | Traveller.com" description="Explore the best destinations with Traveller.com">
      <div>
        <SearchBar />
        <div className="max-w-7xl mx-auto px-4 mt-8">
          <DynamicBreadcrumbs url={'/search'}/>
          <h2 className="text-2xl font-semibold text-orange-500 mb-4">Search Results</h2>

          <p className="text-lg text-gray-700 mb-4">
            {results.length} {results.length === 1 ? 'result' : 'results'} found
          </p>

          {loading==='search' && <Spinner />}

          {searchError && (
            <div className="p-4 rounded-lg text-center">
              <p className="font-semibold text-red-700">Places not found</p>
              <p>{searchError} <span className='text-2xl'>{queryParam}</span></p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {results.map((place) => (
              <DestinationCard key={place._id} destination={place} />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between mt-4 mb-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              className={`px-4 py-2 text-white rounded ${currentPage > 1 ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 cursor-not-allowed'}`}
            >
              Previous
            </button>

            <span>Page {currentPage} of {totalPages}</span>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className={`px-4 py-2 text-white rounded ${currentPage < totalPages ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 cursor-not-allowed'}`}
            >
              Next
            </button>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default SearchResults;
