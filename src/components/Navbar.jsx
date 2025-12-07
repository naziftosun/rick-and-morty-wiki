import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-green-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold hover:text-green-200">
            Rick & Morty Wiki
          </Link>
          <div className="flex space-x-6">
            <Link to="/" className="hover:text-green-200 transition">
              Home
            </Link>
            <Link to="/characters" className="hover:text-green-200 transition">
              Characters
            </Link>
            <Link to="/episodes" className="hover:text-green-200 transition">
              Episodes
            </Link>
            <Link to="/locations" className="hover:text-green-200 transition">
              Locations
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;


