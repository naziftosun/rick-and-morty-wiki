import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Wubba Lubba Dub-Dub!
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Welcome to Rick & Morty Wiki
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-12">
        <Link to="/characters" className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
          <div className="text-center">
            <div className="text-6xl mb-4">👽</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Characters</h2>
          </div>
        </Link>

        <Link to="/episodes" className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
          <div className="text-center">
            <div className="text-6xl mb-4">📺</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Episodes</h2>
          </div>
        </Link>

        <Link to="/locations" className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
          <div className="text-center">
            <div className="text-6xl mb-4">🌍</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Locations</h2>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Home;


