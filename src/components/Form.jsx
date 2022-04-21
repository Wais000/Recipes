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
  }, [data]);

  const submitHandler = (e) => {
    e.preventDefault();
    setSearchInput(search.current.value);
search.current.value=''
  };

  console.log(searchInput);
  return (
   <div className="form-container">
    <form onSubmit={submitHandler}>
      <input type="text" ref={search} placeholder=" search" />
      <button className="form-btn"><h1>search</h1></button>
    </form></div>
  );
};

export default Form;
