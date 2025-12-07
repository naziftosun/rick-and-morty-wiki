import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCharacter } from '../services/api';

function CharacterDetail() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCharacter();
  }, [id]);

  const fetchCharacter = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCharacter(id);
      setCharacter(data);
    } catch (err) {
      setError('Failed to load character details.');
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

  if (error || !character) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-xl text-red-600">{error || 'Character not found'}</p>
          <Link to="/characters" className="text-green-600 hover:underline mt-4 inline-block">
            Back to Characters
          </Link>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    if (status === 'Alive') return 'bg-green-500';
    if (status === 'Dead') return 'bg-red-500';
    return 'bg-gray-500';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/characters" className="text-green-600 hover:underline mb-4 inline-block">
        ← Back to Characters
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3">
            <img 
              src={character.image} 
              alt={character.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:w-2/3 p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {character.name}
            </h1>
            
            <div className="space-y-4">
              <div>
                <span className="font-semibold text-gray-700">Status: </span>
                <span className={`inline-block px-3 py-1 rounded-full text-white text-sm ${getStatusColor(character.status)}`}>
                  {character.status}
                </span>
              </div>
              
              <div>
                <span className="font-semibold text-gray-700">Species: </span>
                <span className="text-gray-600">{character.species}</span>
              </div>
              
              <div>
                <span className="font-semibold text-gray-700">Type: </span>
                <span className="text-gray-600">{character.type || 'Unknown'}</span>
              </div>
              
              <div>
                <span className="font-semibold text-gray-700">Gender: </span>
                <span className="text-gray-600">{character.gender}</span>
              </div>
              
              <div>
                <span className="font-semibold text-gray-700">Origin: </span>
                <span className="text-gray-600">{character.origin.name}</span>
              </div>
              
              <div>
                <span className="font-semibold text-gray-700">Location: </span>
                <span className="text-gray-600">{character.location.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharacterDetail;


