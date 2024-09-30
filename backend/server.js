// const createRecipe = async (newRecipe) => {
//     const response = await fetch('http://localhost:8000/recipes', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(newRecipe),
//     });
    
//     const data = await response.json();
//     return data;
//   };

  
//   const fetchRecipes = async () => {
//     const response = await fetch('http://localhost:8000/recipes');
//     const data = await response.json();
//     return data;
//   };

  
//   const updateRecipe = async (id, updatedRecipe) => {
//     const response = await fetch(`http://localhost:8000/recipes/${id}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(updatedRecipe),
//     });
    
//     const data = await response.json();
//     return data;
//   };

  
//   const deleteRecipe = async (id) => {
//     await fetch(`http://localhost:8000/recipes/${id}`, {
//       method: 'DELETE',
//     });
//   };
  

// server.js

import jsonServer from 'json-server';
import auth from 'json-server-auth';
import { join } from 'path';

const server = jsonServer.create();
const router = jsonServer.router(join(process.cwd(), 'db.json'));
const middlewares = jsonServer.defaults();

// Bind the auth middleware to the json server
server.db = router.db;
server.use(middlewares);
server.use(auth);
server.use(router);

server.listen(8000, () => {
  console.log('JSON Server is running on port 8000');
});

