import React, { useState, useEffect, createContext, useCallback } from "react";
import { getRecipes } from "../Apis/getRecipes";
import { deleteRecipe } from "../Apis/deleteRecipe";
export const UserContext = createContext();
export default function RecipesModule({ children }) {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    getRecipes().then(setRecipes);
  }, []);

  const handleDelete = useCallback(
    (id) => {
      deleteRecipe(id).then(() => {
        getRecipes().then(setRecipes);
      });
    },
    [setRecipes]
  );

  const contextValue = { recipes, setRecipes, handleDelete };
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}
