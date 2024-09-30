import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditRecipePage = () => {
  const [recipe, setRecipe] = useState({
    name: '',
    picture: '',
    ingredients: '',
    instructions: '',
    category: '',
    prepTime: '',
    cookTime: '',
    servings: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/recipes/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setRecipe(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch recipe');
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/recipes/${id}`, recipe, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      navigate('/');
    } catch (err) {
      setError('Failed to update recipe');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Edit Recipe</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">Recipe Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={recipe.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="picture" className="block mb-1">Picture URL</label>
          <input
            type="url"
            id="picture"
            name="picture"
            value={recipe.picture}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="ingredients" className="block mb-1">Ingredients</label>
          <textarea
            id="ingredients"
            name="ingredients"
            value={recipe.ingredients}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            rows="4"
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="instructions" className="block mb-1">Instructions</label>
          <textarea
            id="instructions"
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            rows="4"
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="category" className="block mb-1">Category</label>
          <select
            id="category"
            name="category"
            value={recipe.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="">Select a category</option>
            <option value="Appetizer">Appetizer</option>
            <option value="Main Course">Main Course</option>
            <option value="Dessert">Dessert</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
          </select>
        </div>
        <div>
          <label htmlFor="prepTime" className="block mb-1">Preparation Time</label>
          <input
            type="text"
            id="prepTime"
            name="prepTime"
            value={recipe.prepTime}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="cookTime" className="block mb-1">Cooking Time</label>
          <input
            type="text"
            id="cookTime"
            name="cookTime"
            value={recipe.cookTime}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="servings" className="block mb-1">Servings</label>
          <input
            type="number"
            id="servings"
            name="servings"
            value={recipe.servings}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Update Recipe
        </button>
      </form>
    </div>
  );
};

export default EditRecipePage;