import React, { useContext, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row } from "react-bootstrap";
import { UserContext } from "../components/recipesModule";
import AddRecipe from "./AddRecipe";
import { Link } from "react-router-dom";
import style from "./home.module.css";
function Home() {
  const [modalShow, setModalShow] = useState(false);
  const { recipes, handleDelete } = useContext(UserContext);
  return (
    <>
      <div className={style.nav_div}>
        <span
          className="align-self-center"
          style={{ fontWeight: "bold", fontSize: "22px" }}
        >
          Food Recipes
        </span>

        <Button
          onClick={() => setModalShow(true)}
          className={style.add_recipe_btn}
        >
          Add New Recipe
        </Button>
        <AddRecipe show={modalShow} onHide={() => setModalShow(false)} />
      </div>
      <Container>
        <Row>
          {recipes?.map((recipe) => (
            <Card
              key={recipe._id}
              className={style.recipes_card}
              style={{ width: "18rem" }}
            >
              <Card.Img
                className={style.recipes_card_img}
                src={recipe?.image}
                alt="recipe"
              />
              <Card.Body>
                <Card.Title className={style.title}>{recipe.title}</Card.Title>
              </Card.Body>
              <div className={style.div_btn}>
                <Link to={`/recipe/${recipe._id}`}>
                  <Button className={style.btn_footer}>More Details</Button>
                </Link>
                <Button
                  className={style.btn_footer}
                  onClick={() => handleDelete(recipe._id)}
                >
                  Delete Recipe
                </Button>
              </div>
            </Card>
          ))}
        </Row>
      </Container>
    </>
  );
}
export default Home;
// <div className={style.recipes_card_div}>
// </div>
