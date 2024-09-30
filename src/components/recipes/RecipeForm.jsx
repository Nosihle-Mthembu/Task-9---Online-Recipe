import { useState } from 'react';

const RecipeForm = ({ onSubmit, initialRecipe }) => {
  const [title, setTitle] = useState(initialRecipe?.title || '');
  const [description, setDescription] = useState(initialRecipe?.description || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) {
      alert("Please fill in all fields.");
      return;
    }
    onSubmit({ title, description });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded shadow-md">
      <input
        type="text"
        className="w-full p-2 mb-4 border rounded"
        placeholder="Recipe Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full p-2 mb-4 border rounded"
        placeholder="Recipe Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">
        Submit
      </button>
    </form>
  );
};

export default RecipeForm;
