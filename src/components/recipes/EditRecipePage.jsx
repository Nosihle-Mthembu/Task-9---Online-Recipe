import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const RecipeEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({ name: '', description: '', category: '', rating: 0 });

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await fetch(`http://localhost:8000/recipes/${id}`);
      const data = await response.json();
      setRecipe(data);
    };
    fetchRecipe();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:8000/recipes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(recipe),
      headers: { 'Content-Type': 'application/json' },
    });
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Recipe</h2>
      <label>
        Name:
        <input type="text" name="name" value={recipe.name} onChange={handleChange} required />
      </label>
      <label>
        Description:
        <textarea name="description" value={recipe.description} onChange={handleChange} required />
      </label>
      <label>
        Category:
        <input type="text" name="category" value={recipe.category} onChange={handleChange} required />
      </label>
      <label>
        Rating:
        <input type="number" name="rating" min="1" max="5" value={recipe.rating} onChange={handleChange} />
      </label>
      <button type="submit">Update Recipe</button>
    </form>
  );
};

export default RecipeEdit;
