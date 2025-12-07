import { useState, useEffect } from 'react';
import { getCharacters } from '../services/api';
import CharacterCard from '../components/CharacterCard';
import SearchBar from '../components/SearchBar';

function Characters() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCharacters(1, '');
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCharacters(1, searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchCharacters = async (pageNum, search) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCharacters(pageNum, search);
      if (search) {
        setCharacters(data.results || []);
        setHasMore(false);
      } else {
        setCharacters(data.results || []);
        setHasMore(data.info.next !== null);
      }
    } catch (err) {
      setError('Failed to load characters. Please try again.');
      setCharacters([]);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore && !searchTerm) {
      const nextPage = page + 1;
      setPage(nextPage);
      getCharacters(nextPage, '').then(data => {
        setCharacters(prev => [...prev, ...(data.results || [])]);
        setHasMore(data.info.next !== null);
      });
    }
  };

  if (loading && characters.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Characters</h1>
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error && characters.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Characters</h1>
        <div className="text-center py-12">
          <p className="text-xl text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Characters</h1>
      
      <SearchBar 
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search characters by name..."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {characters.map(character => (
          <CharacterCard key={character.id} character={character} />
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

      {characters.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No characters found.</p>
        </div>
      )}
    </div>
  );
}

export default Characters;


