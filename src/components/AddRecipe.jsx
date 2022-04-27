import React, { useContext } from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { addRecipes } from "../Apis/addRecipe";
import { getRecipes } from "../Apis/getRecipes";
import { UserContext } from "./recipesModule";
import { useForm } from "react-hook-form";
export default function AddRecipe(props) {
  const { setRecipes } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    formData.append("title", data.title);
    formData.append("ingredient", data.ingredient);
    formData.append("recipe", data.recipe);
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
        <form onSubmit={handleSubmit(onSubmit)} className="form-control">
          <div>
            <label>Title</label>
          </div>
          <input
            className="form-control"
            {...register("title", { required: true })}
          />
          <div>
            {errors.title && (
              <span style={{ color: "red" }}>the recipe title is required</span>
            )}
          </div>

          <div>
            <label>Ingredient</label>
          </div>
          <input
            className="form-control"
            {...register("ingredient", { required: true })}
          />
          <div>
            {errors.ingredient && (
              <span style={{ color: "red" }}>
                the recipe ingredient is required
              </span>
            )}
          </div>

          <div>
            <label>Recipe</label>
          </div>
          <textarea
            className="form-control"
            {...register("recipe", { required: true })}
          />
          <div>
            {errors.recipe && (
              <span style={{ color: "red" }}>the recipe name is required</span>
            )}
          </div>
          <div>
            <label>Image of Dish</label>
          </div>
          <input
            className="form-control"
            {...register("image", { required: true })}
            type="file"
          />
          <div>
            {errors.image && (
              <span style={{ color: "red" }}>
                you must upload the image of this recipe
              </span>
            )}
          </div>
          <br />
          <input
            className="form-control"
            style={{
              fontWeight: "bold",
              backgroundColor: "#2b6777",
              color: "white",
            }}
            type="submit"
            value="Add Recipe"
            onClick={() => {
              if (
                errors.title ||
                errors.ingredient ||
                errors.recipe ||
                errors.image
              ) {
                alert("please fill all input the form to add recipe");
              }
              props.onHide();
            }}
          />
        </form>
      </Modal.Body>
    </Modal>
  );
}
