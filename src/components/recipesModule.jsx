import React, {
  useState,
  useEffect,
  createContext,
  useMemo,
  useCallback,
} from "react";
import { getRecipes } from "../Apis/getRecipes";
import { deleteRecipe } from "../Apis/deleteRecipe";
// import { getSingleRecipe } from "./../Apis/getSingleRecipe";
export const UserContext = createContext();
export default function RecipesModule({ children }) {
  const [recipes, setRecipes] = useState([]);
  // const [recipe, setRecipe] = useState([]);
  useEffect(() => {
    getRecipes().then(setRecipes);
  }, []);

  // const getRecipe = useCallback((id) => {
  //   getSingleRecipe(id).then(setRecipe);
  // }, []);

  const handleDelete = useCallback(
    (id) => {
      deleteRecipe(id).then(() => {
        setRecipes(recipes.filter((recipe) => recipe?._id !== id));
      });
    },
    [recipes, setRecipes]
  );
  const contextValue = useMemo(
    () => ({
      recipes,
      setRecipes,
      handleDelete,
      // getRecipe,
      // recipe,
    }),
    [recipes, setRecipes, handleDelete]
  );
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}
