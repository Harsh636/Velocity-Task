import React, { createContext, useState, useEffect } from 'react';

// Create a context
export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(null);

  // On mount, load user and fetch categories
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const fetchData = async () => {
      try {
        const categoriesResponse = await fetch("https://rfpdemo.velsof.com/api/categories");
        const categoriesResult = await categoriesResponse.json();

        if (categoriesResult.response === "success" && categoriesResult.categories) {
          const categoriesArray = Object.values(categoriesResult.categories);
          setCategory(categoriesArray);
        } else {
          console.error("API Error:", categoriesResult.error || "Unknown error");
        }
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchData(); 
  }, []);

  const login = (userData) => {
    setUser(userData);
    sessionStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
  };

  const contextValue = {
    user,
    login,
    logout,
    loading,
    category,
    setCategory,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
