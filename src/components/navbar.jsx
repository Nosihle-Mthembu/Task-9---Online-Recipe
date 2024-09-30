import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../pages/auth';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">Recipe App</Link>
        <div>
          {isAuthenticated ? (
            <>
              <Link to="/" className="text-white mr-4">Recipes</Link>
              <Link to="/add-recipe" className="text-white mr-4">Add Recipe</Link>
              <button onClick={logout} className="text-white">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white mr-4">Login</Link>
              <Link to="/register" className="text-white">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;