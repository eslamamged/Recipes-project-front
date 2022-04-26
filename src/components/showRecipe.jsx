import React, { useEffect, useState, useCallback, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { deleteRecipe } from "./../Apis/deleteRecipe";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import EditRecipe from "./editRecipe";
import { UserContext } from "../components/recipesModule";
export default function ShowRecipe() {
  const [modalShow, setModalShow] = useState(false);
  const { recipes } = useContext(UserContext);
  const [recipe, setRecipe] = useState([]);
  const navigate = useNavigate();
  let { id } = useParams();
  useEffect(() => {
    const recipe = recipes.find((recipe) => recipe._id === id);
    setRecipe(recipe);
  }, [recipes, id]);
  const handleDelete = useCallback(
    (id) => {
      deleteRecipe(id);
      navigate("/");
    },
    [navigate]
  );
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
        <Link to={"/"}>
          <Button variant="primary" style={{ margin: "10px" }}>
            Back to HomePage
          </Button>
        </Link>
      </div>
      <div
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
        }}
      >
        <Card className="my-4 p-2 rounded">
          <Card.Img
            variant="top"
            src={recipe?.image}
            style={{ width: "200px", height: "200px", margin: "auto" }}
            alt="recipe"
          />
          <Card.Body>
            <Card.Title>{recipe?.title}</Card.Title>
            <Card.Text>{recipe?.recipe}</Card.Text>
            <Card.Text>{recipe?.ingredient}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <Button
              style={{ margin: "5px", textAlign: "center" }}
              onClick={() => handleDelete(recipe?._id)}
            >
              Delete Recipe
            </Button>
            <Button onClick={() => setModalShow(true)}>Edit Recipe</Button>
            <EditRecipe
              recipe={recipe}
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </Card.Footer>
        </Card>
      </div>
    </>
  );
}
