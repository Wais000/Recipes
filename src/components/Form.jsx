import { useState, useRef, useEffect } from "react";
import useFetch from "../useFetch/useFetch";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const navigator = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const search = useRef();

  const data = useFetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`
  );

  console.log(data);
  useEffect(() => {
    data.results &&
      searchInput &&
      navigator("/search-results", { state: data });
  }, [data]);//eslint-disable-line react-hooks/exhaustive-deps


  const submitHandler = (e) => {
    e.preventDefault();
    setSearchInput(search.current.value);
search.current.value=''
  };

  console.log(searchInput);
  return (
   
    <form onSubmit={submitHandler} className="form-container">
      <input type="text" ref={search} placeholder="search" />
      <button className="form-btn">search</button>
    </form>
  );
};

export default Form;
