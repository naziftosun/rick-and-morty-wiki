import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getLocation } from '../services/api';

function LocationDetail() {
  const { id } = useParams();
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [residents, setResidents] = useState([]);

  useEffect(() => {
    fetchLocation();
  }, [id]);

  const fetchLocation = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getLocation(id);
      setLocation(data);
      
      if (data.residents && data.residents.length > 0) {
        const residentPromises = data.residents.map(url => fetch(url).then(res => res.json()));
        const residentData = await Promise.all(residentPromises);
        setResidents(residentData);
      }
    } catch (err) {
      setError('Failed to load location details.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !location) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-xl text-red-600">{error || 'Location not found'}</p>
          <Link to="/locations" className="text-green-600 hover:underline mt-4 inline-block">
            Back to Locations
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/locations" className="text-green-600 hover:underline mb-4 inline-block">
        ← Back to Locations
      </Link>

      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          {location.name}
        </h1>
        
        <div className="space-y-4">
          <div>
            <span className="font-semibold text-gray-700">Type: </span>
            <span className="text-gray-600">{location.type}</span>
          </div>
          
          <div>
            <span className="font-semibold text-gray-700">Dimension: </span>
            <span className="text-gray-600">{location.dimension}</span>
          </div>
        </div>
      </div>

      {residents.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Residents</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {residents.map(character => (
              <Link 
                key={character.id} 
                to={`/characters/${character.id}`}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition-shadow text-center"
              >
                <img 
                  src={character.image} 
                  alt={character.name}
                  className="w-full h-32 object-cover rounded mb-2"
                />
                <p className="text-sm font-medium text-gray-800">{character.name}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {residents.length === 0 && (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <p className="text-gray-600">No known residents.</p>
        </div>
      )}
    </div>
  );
}

export default LocationDetail;


