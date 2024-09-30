const RecipeCard = ({ recipe, onDelete }) => (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white">
      <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
      <p className="text-gray-700">{recipe.description}</p>
      <div className="mt-4">
        <button className="bg-blue-500 text-white py-1 px-3 rounded" onClick={() => onDelete(recipe.id)}>
          Delete
        </button>
        <button className="bg-green-500 text-white py-1 px-3 rounded ml-2">
          Edit
        </button>
      </div>
    </div>
  );
  
  export default RecipeCard;
  