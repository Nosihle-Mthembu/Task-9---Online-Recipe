import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './pages/auth';
import Navbar from './components/navbar';
import LoginPage from './components/Login';
import RegisterPage from './components/Register';
import RecipesPage from './components/recipes/RecipePage';
import PrivacyPolicyPage from './components/shared/PrivateRoute';
import AddRecipePage from './components/recipes/AddRecipePage';
import EditRecipePage from './components/recipes/EditRecipePage';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <RecipesPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/add-recipe"
                element={
                  <PrivateRoute>
                    <AddRecipePage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/edit-recipe/:id"
                element={
                  <PrivateRoute>
                    <EditRecipePage />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;