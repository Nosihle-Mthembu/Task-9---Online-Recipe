import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeList from './components/recipes/recipeList';
import RecipeDetails from './components/recipes/RecipeDetails';
import RecipeEdit from './components/recipes/EditRecipePage';
import RecipeCreate from './components/recipes/RecipePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RecipeList />} />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
        <Route path="/edit-recipe/:id" element={<RecipeEdit />} />
        <Route path="/create-recipe" element={<RecipeCreate />} />
      </Routes>
    </Router>
  );
};

export default App;
