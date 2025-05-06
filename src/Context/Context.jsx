import React, { createContext, useState, useEffect } from 'react';

// Create a context
export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [rfpData, setRfpData] = useState([]);
  const [approveVendor, setApproveVendor] = useState(false);


  useEffect(()=>{
    if(user){
      const fetchData = async ()=>{
        try{
           // Fetch RFP data
        const rfpResponse = await fetch(`https://rfpdemo.velsof.com/api/rfp/getrfp/${user.user_id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        });
        const rfpDataResult = await rfpResponse.json();
        
        if (rfpResponse.ok && rfpDataResult.response === "success") {
          
          setRfpData(rfpDataResult.rfps || []);
        } else{
          console.log(rfpDataResult.error);
        }
        } catch(error){
          console.error("Fetch Error:", error);
        }
      }
      fetchData();
    }
    
  },[user, approveVendor])

  // On mount, load user and fetch categories
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const fetchData = async () => {
      try {
        // category api
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
    rfpData,
    setRfpData,
    approveVendor,
    setApproveVendor,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
