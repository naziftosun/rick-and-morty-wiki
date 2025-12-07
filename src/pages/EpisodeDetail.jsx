import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getEpisode } from '../services/api';

function EpisodeDetail() {
  const { id } = useParams();
  const [episode, setEpisode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetchEpisode();
  }, [id]);

  const fetchEpisode = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getEpisode(id);
      setEpisode(data);
      
      if (data.characters && data.characters.length > 0) {
        const characterPromises = data.characters.map(url => fetch(url).then(res => res.json()));
        const characterData = await Promise.all(characterPromises);
        setCharacters(characterData);
      }
    } catch (err) {
      setError('Failed to load episode details.');
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

  if (error || !episode) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-xl text-red-600">{error || 'Episode not found'}</p>
          <Link to="/episodes" className="text-green-600 hover:underline mt-4 inline-block">
            Back to Episodes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/episodes" className="text-green-600 hover:underline mb-4 inline-block">
        ← Back to Episodes
      </Link>

      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          {episode.name}
        </h1>
        
        <div className="space-y-4 mb-6">
          <div>
            <span className="font-semibold text-gray-700">Episode: </span>
            <span className="text-gray-600">{episode.episode}</span>
          </div>
          
          <div>
            <span className="font-semibold text-gray-700">Air Date: </span>
            <span className="text-gray-600">{episode.air_date}</span>
          </div>
        </div>
      </div>

      {characters.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Characters</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {characters.map(character => (
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
    </div>
  );
}

export default EpisodeDetail;


