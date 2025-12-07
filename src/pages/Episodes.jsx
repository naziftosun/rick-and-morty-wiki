import { useState, useEffect } from 'react';
import { getEpisodes } from '../services/api';
import EpisodeCard from '../components/EpisodeCard';
import SearchBar from '../components/SearchBar';

function Episodes() {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchEpisodes(1, '');
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchEpisodes(1, searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchEpisodes = async (pageNum, search) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getEpisodes(pageNum, search);
      if (search) {
        setEpisodes(data.results || []);
        setHasMore(false);
      } else {
        setEpisodes(data.results || []);
        setHasMore(data.info.next !== null);
      }
    } catch (err) {
      setError('Failed to load episodes. Please try again.');
      setEpisodes([]);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore && !searchTerm) {
      const nextPage = page + 1;
      setPage(nextPage);
      getEpisodes(nextPage, '').then(data => {
        setEpisodes(prev => [...prev, ...(data.results || [])]);
        setHasMore(data.info.next !== null);
      });
    }
  };

  if (loading && episodes.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Episodes</h1>
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error && episodes.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Episodes</h1>
        <div className="text-center py-12">
          <p className="text-xl text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Episodes</h1>
      
      <SearchBar 
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search episodes by name..."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {episodes.map(episode => (
          <EpisodeCard key={episode.id} episode={episode} />
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

      {episodes.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No episodes found.</p>
        </div>
      )}
    </div>
  );
}

export default Episodes;


