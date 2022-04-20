import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../../useFetch/useFetch";
import { useLocation } from "react-router-dom";
import {FontAwesomeIcon}from '@fortawesome/react-fontawesome'
import { faHome } from "@fortawesome/free-solid-svg-icons";

const Nav = () => {
 
  const location = useLocation();
  console.log(location);
  const url = "https://www.themealdb.com/api/json/v1/1/categories.php";

  const data = useFetch(url);

  console.log(data);

  return (
    <div className="nav"> 
     <Link to={"/"}><FontAwesomeIcon icon={faHome} className='f_icon'></FontAwesomeIcon></Link>{" "}
  </div>
  );
};

export default Nav;
