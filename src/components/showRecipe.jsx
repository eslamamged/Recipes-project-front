import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import EditRecipe from "./editRecipe";
import { UserContext } from "../components/recipesModule";
import style from "./show.module.css";

export default function ShowRecipe() {
  const [modalShow, setModalShow] = useState(false);
  const { recipes, handleDelete } = useContext(UserContext);
  const [recipe, setRecipe] = useState([]);
  const navigate = useNavigate();
  let { id } = useParams();
  useEffect(() => {
    const recipe = recipes.find((recipe) => recipe._id === id);
    setRecipe(recipe);
  }, [recipes, id]);
  return (
    <>
      <div className={style.nav_div}>
        <span
          className="align-self-center"
          style={{ fontWeight: "bold", fontSize: "22px" }}
        >
          Recipes
        </span>
        <Link to={"/"}>
          <Button variant="primary" className={style.back_btn}>
            Back to HomePage
          </Button>
        </Link>
      </div>
      <div className={style.recipes_card_div}>
        <div className="row no-gutters">
          <div className="col-md-4">
            <img
              style={{
                height: "480px",
                width: "100%",
              }}
              src={recipe?.image}
              className="card-img"
              alt="img of dish"
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h3 className={style.title}>{recipe?.title}</h3>
              <p className="card-text">
                <b>The Ingredient : </b>
                {recipe?.ingredient}
              </p>
              <p className="card-text">
                <b>The Recipe : </b>
                {recipe?.recipe}
              </p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              className={style.btn_footer}
              onClick={() => {
                handleDelete(recipe?._id);
                navigate("/");
              }}
            >
              Delete Recipe
            </Button>
            <Button
              className={style.btn_footer}
              onClick={() => setModalShow(true)}
            >
              Edit Recipe
            </Button>
            <EditRecipe
              recipe={recipe}
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
