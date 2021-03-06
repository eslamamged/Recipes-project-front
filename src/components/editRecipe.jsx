import React, { useState, useEffect, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import { editRecipe } from "../Apis/editRecipe";
import { getRecipes } from "../Apis/getRecipes";
import { UserContext } from "./recipesModule";
export default function EditRecipe(props) {
  const formData = new FormData();
  const { setRecipes } = useContext(UserContext);
  const recipe = props;
  const [newRecipe, setnewRecipe] = useState({});
  useEffect(() => {
    setnewRecipe({
      title: recipe?.recipe?.title,
      image: recipe?.recipe?.image,
      ingredient: recipe?.recipe?.ingredient,
      recipe: recipe?.recipe?.recipe,
    });
  }, [recipe, setnewRecipe]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setnewRecipe((currentrecipe) => {
      const file = e.target.files;
      if (name === "image") {
        return { ...currentrecipe, [name]: file };
      }
      return { ...currentrecipe, [name]: value };
    });
  };
  const handleSubmit = (e) => {
    if (
      newRecipe.title === "" ||
      newRecipe.ingredient === "" ||
      newRecipe.recipe === "" ||
      newRecipe.image === ""
    ) {
      e.preventDefault();
      alert("Please fill all the fields");
    } else {
      e.preventDefault();
      formData.append("image", newRecipe.image[0]);
      formData.append("title", newRecipe.title);
      formData.append("ingredient", newRecipe.ingredient);
      formData.append("recipe", newRecipe.recipe);
      editRecipe(recipe?.recipe?._id, formData).then(() => {
        getRecipes().then(setRecipes);
      });
    }
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
          Edit Recipe
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
              value={newRecipe?.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Ingredient</label>
          </div>
          <div>
            <input
              type="text"
              className="form-control"
              name="ingredient"
              placeholder="Enter ingredient"
              value={newRecipe?.ingredient}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Recipe</label>
          </div>
          <div>
            <textarea
              type="text"
              className="form-control"
              name="recipe"
              placeholder="Enter recipe"
              value={newRecipe?.recipe}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Image</label>
          </div>
          <div>
            <input
              type="file"
              name="image"
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="submit"
              className="form-control"
              style={{
                fontWeight: "bold",
                backgroundColor: "#2b6777",
                color: "white",
              }}
              value="Edit Recipe"
              onClick={props.onHide}
            />
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
