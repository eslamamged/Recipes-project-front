import React, { useContext, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserContext } from "../components/recipesModule";
import AddRecipe from "./AddRecipe";
import { Link } from "react-router-dom";
function Home() {
  const [modalShow, setModalShow] = useState(false);
  const { recipes, handleDelete } = useContext(UserContext);
  return (
    <>
      <div
        style={{
          backgroundColor: "blue",
          color: "white",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <span
          className="align-self-center"
          style={{ fontWeight: "bold", fontSize: "22px" }}
        >
          Recipes
        </span>

        <Button
          variant="primary"
          onClick={() => setModalShow(true)}
          style={{ margin: "10px" }}
        >
          Add New Recipe
        </Button>
        <AddRecipe show={modalShow} onHide={() => setModalShow(false)} />
      </div>
      <div
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "1px 15px",
        }}
      >
        {recipes?.map((recipe) => (
          <Card className="my-4 p-2 rounded" key={recipe._id}>
            <Card.Img variant="top" src="{recipe.image}" />
            <Card.Body>
              <Card.Title>{recipe.title}</Card.Title>
              <Card.Text>{recipe.recipe}</Card.Text>
              <Card.Text>{recipe.ingredient}</Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button
                style={{ margin: "5px" }}
                onClick={() => handleDelete(recipe._id)}
              >
                Delete Recipe
              </Button>
              <Link to={`/recipe/${recipe._id}`}>
                <Button>More Details</Button>
              </Link>
            </Card.Footer>
          </Card>
        ))}
      </div>
    </>
  );
}
export default Home;
