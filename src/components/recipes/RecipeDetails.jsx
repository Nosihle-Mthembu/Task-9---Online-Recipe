import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await fetch(`http://localhost:8000/recipes/${id}`);
      const data = await response.json();
      setRecipe(data);
      setIsFavorite(data.favorite || false);
      setRating(data.rating || 0);
    };
    fetchRecipe();
  }, [id]);

  const toggleFavorite = async () => {
    const updatedRecipe = { ...recipe, favorite: !isFavorite };
    await fetch(`http://localhost:8000/recipes/${recipe.id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedRecipe),
      headers: { 'Content-Type': 'application/json' },
    });
    setIsFavorite(!isFavorite);
  };

  const submitRating = async () => {
    const updatedRecipe = { ...recipe, rating: rating };
    await fetch(`http://localhost:8000/recipes/${recipe.id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedRecipe),
      headers: { 'Content-Type': 'application/json' },
    });
  };

  if (!recipe) return <div>Loading...</div>;

  return (
    <div>
      <h2>{recipe.name}</h2>
      <p>{recipe.description}</p>
      <button onClick={toggleFavorite}>
        {isFavorite ? 'Unfavorite' : 'Favorite'}
      </button>
      <div>
        <label>
          Rate this recipe:
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={e => setRating(Number(e.target.value))}
          />
        </label>
        <button onClick={submitRating}>Submit Rating</button>
      </div>
      <Link to="/">Back to Recipes</Link>
    </div>
  );
};

export default RecipeDetails;
