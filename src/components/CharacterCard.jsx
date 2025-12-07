import { Link } from 'react-router-dom';

function CharacterCard({ character }) {
  return (
    <Link to={`/characters/${character.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
        <img 
          src={character.image} 
          alt={character.name}
          className="w-full h-64 object-cover"
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {character.name}
          </h3>
          <p className="text-gray-600">
            <span className="font-medium">Species:</span> {character.species}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Status:</span> {character.status}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default CharacterCard;


