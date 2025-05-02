import React, { useContext, useEffect } from 'react';
import { UserContext } from '../Context/Context';

const GetCategory = () => {
  const { setCategory } = useContext(UserContext);

  useEffect(() => {
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
      }
    };

    fetchData(); 
  }, [setCategory]);

  return null; 
};

export default GetCategory;
