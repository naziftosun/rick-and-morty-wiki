import { Link } from 'react-router-dom';

function EpisodeCard({ episode }) {
  return (
    <Link to={`/episodes/${episode.id}`}>
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow cursor-pointer">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {episode.name}
        </h3>
        <p className="text-gray-600 mb-2">
          <span className="font-medium">Episode:</span> {episode.episode}
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Air Date:</span> {episode.air_date}
        </p>
      </div>
    </Link>
  );
}

export default EpisodeCard;


