const deleteRecipe = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this recipe?");
    if (confirmDelete) {
      await fetch(`http://localhost:8000/recipes/${recipe.id}`, { method: 'DELETE' });
      // Redirect or update state as needed
    }
  };
  
  // Inside your return statement
  <button onClick={deleteRecipe}>Delete Recipe</button>
  
