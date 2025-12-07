import { Link } from 'react-router-dom';

function LocationCard({ location }) {
  return (
    <Link to={`/locations/${location.id}`}>
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow cursor-pointer">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {location.name}
        </h3>
        <p className="text-gray-600 mb-2">
          <span className="font-medium">Type:</span> {location.type}
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Dimension:</span> {location.dimension}
        </p>
      </div>
    </Link>
  );
}

export default LocationCard;


