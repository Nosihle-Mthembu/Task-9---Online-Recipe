import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [ratingFilter, setRatingFilter] = useState(0); // Minimum rating to filter

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch('http://localhost:8000/recipes');
      const data = await response.json();
      setRecipes(data);
    };
    fetchRecipes();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('http://localhost:8000/categories');
      const data = await response.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  // Filter recipes based on search term and selected category
  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? recipe.category === selectedCategory : true;
    const matchesRating = recipe.rating >= ratingFilter;

    return matchesSearch && matchesCategory && matchesRating;
  });

  // Sort recipes based on name
  const sortedRecipes = [...filteredRecipes].sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    return sortOrder === 'asc' ? (nameA < nameB ? -1 : 1) : (nameA > nameB ? -1 : 1);
  });

  return (
    <div>
      <h2>All Recipes</h2>
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <select onChange={e => setSortOrder(e.target.value)}>
        <option value="asc">Sort Ascending</option>
        <option value="desc">Sort Descending</option>
      </select>
      <select onChange={e => setSelectedCategory(e.target.value)} defaultValue="">
        <option value="">All Categories</option>
        {categories.map(category => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      <select onChange={e => setRatingFilter(Number(e.target.value))} defaultValue={0}>
        <option value={0}>All Ratings</option>
        <option value={1}>1 Star & Up</option>
        <option value={2}>2 Stars & Up</option>
        <option value={3}>3 Stars & Up</option>
        <option value={4}>4 Stars & Up</option>
        <option value={5}>5 Stars</option>
      </select>
      <ul>
        {sortedRecipes.map(recipe => (
          <li key={recipe.id}>
            <Link to={`/recipes/${recipe.id}`}>{recipe.name}</Link> - Rating: {recipe.rating || 'Not Rated'}
            <Link to={`/edit-recipe/${recipe.id}`}> Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
