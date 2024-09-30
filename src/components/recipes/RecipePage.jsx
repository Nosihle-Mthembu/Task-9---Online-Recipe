import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/recipes', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setRecipes(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch recipes');
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      try {
        await axios.delete(`http://localhost:3001/recipes/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setRecipes(recipes.filter(recipe => recipe.id !== id));
      } catch (err) {
        setError('Failed to delete recipe');
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-5">Recipes</h2>
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full px-3 py-2 border rounded mb-5"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map(recipe => (
          <div key={recipe.id} className="bg-white p-4 rounded shadow">
            <img src={recipe.picture} alt={recipe.name} className="w-full h-48 object-cover mb-4 rounded" />
            <h3 className="text-xl font-semibold mb-2">{recipe.name}</h3>
            <p className="text-gray-600 mb-2">Category: {recipe.category}</p>
            <p className="text-gray-600 mb-2">Prep time: {recipe.prepTime}</p>
            <p className="text-gray-600 mb-4">Cook time: {recipe.cookTime}</p>
            <div className="flex justify-between">
              <Link to={`/edit-recipe/${recipe.id}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Edit</Link>
              <button onClick={() => handleDelete(recipe.id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipesPage;