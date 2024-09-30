import { useState } from 'react';
import axios from 'axios';

const AddRecipe = () => {
  const [recipe, setRecipe] = useState({ name: '', description: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/recipes', recipe)
      .then(response => console.log('Recipe added:', response.data))
      .catch(error => console.error('Error adding recipe:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={recipe.name}
          onChange={(e) => setRecipe({ ...recipe, name: e.target.value })}
        />
      </label>
      <label>
        Description:
        <textarea
          value={recipe.description}
          onChange={(e) => setRecipe({ ...recipe, description: e.target.value })}
        />
      </label>
      <button type="submit">Add Recipe</button>
    </form>
  );
};

export default AddRecipe;
