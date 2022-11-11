import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useFetch from "../useFetch/useFetch";
import {FontAwesomeIcon}from '@fortawesome/react-fontawesome'
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Sections = () => {
  const { strCategory } = useParams();
  const navigate = useNavigate();

  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${strCategory}`;
  //console.log(url);

  const data = useFetch(url);

  if (data.loading) return <p>Loading ...</p>;

  if (data.error) return <p>{data.error}</p>;

  console.log(data);

  return (
    <div className="main_card">
     <FontAwesomeIcon className='return'icon={faArrowLeft}  onClick={() => navigate(-1)}></FontAwesomeIcon> 

      <div className="section_Container">
        {" "}
        {data.results &&
          data.results.meals.map((meal) => (
            <div className="section_card">
              <img className="img_card" src={meal.strMealThumb} alt="" />
              <div className="section_content">
                <h1>
                  {" "}
                  <Link className="card_Header" to={`/sections/${meal.idMeal}`}>
                    {meal.strMeal}{" "}
                  </Link>{" "}
                </h1>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Sections;
