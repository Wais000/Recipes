import React from "react";
import useFetch from "../../useFetch/useFetch";
import { useParams, useNavigate } from "react-router-dom";
import {FontAwesomeIcon}from '@fortawesome/react-fontawesome'
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Ingredient = () => {
  const { idMeal } = useParams();
  const navigate = useNavigate();

  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;

  const data = useFetch(url);
  console.log(data);

  let ing = "";
  let ingSet = [];
  for (let j = 0; j < (data.results ? data.results.meals.length : 0); j++) {
    for (let i = 1; i <= 20; i++) {
      ing +=
        data.results?.meals[j][`strIngredient${i}`] +
        " " +
        data.results?.meals[j][`strMeasure${i}`] +
        ",";
    }

    ingSet.push(ing.split(","));
  }

  return (
    <div className="ingredient">
 <FontAwesomeIcon className='return'icon={faArrowLeft}  onClick={() => navigate(-1)}></FontAwesomeIcon> 

      {/*          <button onClick={()=> navigate(-1)}>Return</button> */}
      {data.results &&
        data.results.meals.map((ingredient, i) => (
          <div key={ingredient.id} className="ingredient-card">
            <div className="img-container">
              <h1>{ingredient.strMeal}</h1>

              <img src={ingredient.strMealThumb} alt="" />
              <a target="_blank" rel="noreferrer" href={ingredient.strYoutube}>
                <p> watch the full instruction of this Recipe in Youtube</p>
              </a>
            </div>

            <div className="instruction">
              {" "}
              <h1>instruction</h1>
              <p>{ingredient.strInstructions}</p>
            </div>

            <div className="ingredient-list">
              {" "}
              <h1>ingredients</h1>
              <ul>
                {ingSet[i].map((item, ind) => (
                  <li key={ind}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Ingredient;
