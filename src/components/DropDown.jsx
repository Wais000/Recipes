import React, { useEffect, useState } from "react";
import useFetch from "../useFetch/useFetch";
import { useNavigate, useLocation, Link } from "react-router-dom";


const DropDown = () => {
    const[dropDownData, setDropDownData]=useState([])
    const navigator = useNavigate();
  const location = useLocation();
  console.log(location);

 
  const setCategory = (e) => {

    if(location.pathname === '/'){
        navigator(`/home/${e.target.value}`)
    } else{
        const item=dropDownData.find(({strCategory} )=>setCategory=== e.target.value) 
        navigator(`/sections/${e.target.idCategory}`)
    }
    
    console.log(e.target.value);
  };

  const fetchData= async(location)=>{
      
      if(location.pathname==='/'){
          const response=await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
          const data=await response.json()
          setDropDownData(data.categories)
      } else{
        const response=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${location.pathname.replace('/home/','')}`)
        const data=await response.json()
        console.log(data,'test');
    
        setDropDownData(data.meals.map(item=>({strCategory:item.strMeal,id:item.id})))
      }
  }

useEffect(()=>{

fetchData(location)

},[location.pathname])

  return (
    <select onChange={setCategory}>
      {dropDownData &&
              
              dropDownData.map((name) => {
          return (
            <option value={name.strCategory}>
            <Link>{name.strCategory.toUpperCase()}</Link> 
            </option>
          );
        })}
    </select>
  );
};

export default DropDown;
