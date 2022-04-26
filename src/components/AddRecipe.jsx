import React, { useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import { addRecipes } from "../Apis/addRecipe";
import { getRecipes } from "../Apis/getRecipes";
import { UserContext } from "./recipesModule";
export default function AddRecipe(props) {
  const formData = new FormData();

  const { setRecipes } = useContext(UserContext);
  const [newRecipe, setnewRecipe] = useState({
    title: "",
    ingredient: "",
    recipe: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    const file = e.target.files;
    setnewRecipe((currentrecipe) => {
      if (name === "image") {
        return { ...currentrecipe, [name]: file };
      }
      return { ...currentrecipe, [name]: value };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    formData.append("image", newRecipe.image[0]);
    formData.append("title", newRecipe.title);
    formData.append("ingredient", newRecipe.ingredient);
    formData.append("recipe", newRecipe.recipe);
    addRecipes(formData).then(() => {
      getRecipes().then(setRecipes);
    });
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add New Recipe
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} className="form-control">
          <div>
            <label>Title</label>
          </div>
          <div>
            <input
              className="form-control"
              type="text"
              name="title"
              placeholder="Enter Title"
              value={newRecipe.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Ingredient</label>
          </div>
          <div>
            <input
              className="form-control"
              type="text"
              name="ingredient"
              placeholder="Enter ingredient"
              value={newRecipe.ingredient}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Recipe</label>
          </div>
          <div>
            <textarea
              className="form-control"
              type="text"
              name="recipe"
              placeholder="Enter recipe"
              value={newRecipe.recipe}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Image</label>
          </div>
          <div>
            <input
              className="form-control"
              type="file"
              name="image"
              onChange={handleChange}
            />
          </div>
          <br />
          <div>
            <input
              type="submit"
              value="Add Recipe"
              onClick={props.onHide}
              className="form-control"
              style={{
                fontWeight: "bold",
                backgroundColor: "green",
                color: "white",
              }}
            />
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

//000000000000000000000000000000
// <form onSubmit={handleSubmit(onSubmit)} className="form-control">
// <div>
//   <label>Title</label>
// </div>
// <input
//   className="form-control"
//   {...register("title", { required: true })}
// />
// <div>
//   {errors.title && (
//     <span style={{ color: "red" }}>the recipe title is required</span>
//   )}
// </div>

// <div>
//   <label>Ingredient</label>
// </div>
// <input
//   className="form-control"
//   {...register("ingredient", { required: true })}
// />
// <div>
//   {errors.ingredient && (
//     <span style={{ color: "red" }}>
//       the recipe ingredient is required
//     </span>
//   )}
// </div>

// <div>
//   <label>Recipe</label>
// </div>
// <textarea
//   className="form-control"
//   {...register("recipe", { required: true })}
// />
// <div>
//   {errors.recipe && (
//     <span style={{ color: "red" }}>the recipe name is required</span>
//   )}
// </div>
// <div>
//   <label>Image of Dish</label>
// </div>
// <input
//   className="form-control"
//   {...register("image", { required: true })}
//   type="file"
// />
// <div>
//   {errors.image && (
//     <span style={{ color: "red" }}>
//       you must upload the image of this recipe
//     </span>
//   )}
// </div>
// <input
//   className="form-control"
//   style={{ fontWeight: "bold" }}
//   type="submit"
//   value="Add Recipe"
//   onClick={props.onHide}
// />
// </form>
