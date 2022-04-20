import React from "react";
import { useLocation, Link, useParams,useNavigate} from "react-router-dom";
import {FontAwesomeIcon}from '@fortawesome/react-fontawesome'
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const SearchResults = () => {
  const { strCategory } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  if (location?.state?.loading) return <p> Loading ...</p>;
  if (location?.state?.error) return <p>{location.state.error}</p>;


/*   <div className="main_card"> 
   <FontAwesomeIcon className='return'icon={faArrowLeft}  onClick={() => navigate(-1)}></FontAwesomeIcon> </div>
  {location?.state?.results?.meals ? (
    location.state.results.meals.map((result, i) => (
      <div key={i} className="section_card">
        <img className="img_card" src={result.strMealThumb} alt="" />
        <div className="section_content">
          <h1>
            <Link
              className="card_Header"
              to={`/search-results/${result.strCategory}`}
            >
              {result.strMeal}
            </Link>
          </h1>{" "}
        </div>
      </div>
    ))}
  ) : (
    <h1>No result found</h1>
  ); */

  return (
<div className="main_card">
    <FontAwesomeIcon className='return'icon={faArrowLeft}  onClick={() => navigate(-1)}></FontAwesomeIcon>
    
    <div className="section_Container">
    {location?.state?.results?.meals ? (
    location.state.results.meals.map((result, i) => (
      <div key={i} className="section_card">
        <img className="img_card" src={result.strMealThumb} alt="" />
        <div className="section_content">
          <h1>
            <Link
              className="card_Header"
              to={`/search-results/${result.strCategory}`}
            >
              {result.strMeal}
            </Link>
          </h1>{" "}
        </div>
      </div>
    ))
    ) : (
      <h1 className="no_page_found">No result found, please try some synonym Name of the Recipe </h1>
    ) }
   </div>
   </div>
  )
};

export default SearchResults;
