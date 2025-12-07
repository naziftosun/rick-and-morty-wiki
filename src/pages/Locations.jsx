import { useState, useEffect } from 'react';
import { getLocations } from '../services/api';
import LocationCard from '../components/LocationCard';
import SearchBar from '../components/SearchBar';

function Locations() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchLocations(1, '');
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchLocations(1, searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchLocations = async (pageNum, search) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getLocations(pageNum, search);
      if (search) {
        setLocations(data.results || []);
        setHasMore(false);
      } else {
        setLocations(data.results || []);
        setHasMore(data.info.next !== null);
      }
    } catch (err) {
      setError('Failed to load locations. Please try again.');
      setLocations([]);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore && !searchTerm) {
      const nextPage = page + 1;
      setPage(nextPage);
      getLocations(nextPage, '').then(data => {
        setLocations(prev => [...prev, ...(data.results || [])]);
        setHasMore(data.info.next !== null);
      });
    }
  };

  if (loading && locations.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Locations</h1>
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error && locations.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Locations</h1>
        <div className="text-center py-12">
          <p className="text-xl text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Locations</h1>
      
      <SearchBar 
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search locations by name..."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locations.map(location => (
          <LocationCard key={location.id} location={location} />
        ))}
      </div>

      {hasMore && !searchTerm && (
        <div className="text-center mt-8">
          <button
            onClick={loadMore}
            disabled={loading}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}

      {locations.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No locations found.</p>
        </div>
      )}
    </div>
  );
}

export default Locations;


