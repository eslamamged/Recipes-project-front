import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
// import { addRecipes } from "../Apis/addRecipe";
export default function EditRecipe(props) {
  const recipe = props;
  const [newRecipe, setnewRecipe] = useState({});
  useEffect(() => {
    setnewRecipe({
      title: recipe?.recipe?.title,
      image: recipe?.recipe?.image,
      ingredient: recipe?.recipe?.ingredient,
      recipe: recipe?.recipe?.recipe,
    });
  }, [recipe]);
  console.log(newRecipe);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setnewRecipe((currentrecipe) => {
      return { ...currentrecipe, [name]: value };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
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
        <Form onSubmit={handleSubmit}>
          <div>
            <label>Title</label>
          </div>
          <div>
            <input
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
              name="ingredient"
              placeholder="Enter ingredient"
              value={recipe?.ingredient}
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
              value={recipe?.recipe}
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
              value={recipe?.image}
              onChange={handleChange}
            />
          </div>
          <div>
            <input type="submit" value="Edit Recipe" onClick={props.onHide} />
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
