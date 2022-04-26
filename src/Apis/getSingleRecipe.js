import axios from "axios";

export const getSingleRecipe = async (id) => {
  const res = await axios.get(`http://localhost:4000/recipes/${id}`);
  return res?.data;
};
