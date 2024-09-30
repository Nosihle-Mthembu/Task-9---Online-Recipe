const login = async (username, password) => {
    const response = await fetch('http://localhost:8000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    
    const data = await response.json();
    if (data.token) {
      localStorage.setItem('token', data.token); // Store JWT
    }
  };

  
  const fetchRecipes = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:8000/recipes', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  };
  