import { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch('http://localhost:8000/recipes');
      const data = await response.json();
      setRecipes(data);
    };
    fetchRecipes();
  }, []);

  const deleteRecipe = async (id) => {
    await fetch(`http://localhost:8000/recipes/${id}`, {
      method: 'DELETE',
    });
    setRecipes(recipes.filter(recipe => recipe.id !== id));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {recipes.map(recipe => (
        <RecipeCard key={recipe.id} recipe={recipe} onDelete={deleteRecipe} />
      ))}
    </div>
  );
};

export default RecipeList;
