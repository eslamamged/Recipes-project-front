import React, { useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import { addRecipes } from "../Apis/addRecipe";
import { getRecipes } from "../Apis/getRecipes";
import { UserContext } from "./recipesModule";
export default function AddRecipe(props) {
  const { setRecipes } = useContext(UserContext);
  const [newRecipe, setnewRecipe] = useState({
    title: "",
    ingredient: "",
    recipe: "",
    image: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setnewRecipe((currentrecipe) => {
      return { ...currentrecipe, [name]: value };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addRecipes(newRecipe).then(() => {
      console.log(newRecipe);
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
        <Modal.Title id="contained-modal-title-vcenter">ADD USER</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <div>
            <label>Title</label>
          </div>
          <div>
            <input
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
            <input
              type="text"
              name="recipe"
              placeholder="Enter phone recipe"
              value={newRecipe.recipe}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Image</label>
          </div>
          <div>
            <input
              type="text"
              name="image"
              placeholder="Enter image"
              value={newRecipe.image}
              onChange={handleChange}
            />
          </div>
          <div>
            <input type="submit" value="Add Recipe" onClick={props.onHide} />
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
