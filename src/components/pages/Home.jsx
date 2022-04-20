import React from "react";
import useFetch from "../../useFetch/useFetch";
import { Link } from "react-router-dom";

const Home = () => {
  const url = "https://www.themealdb.com/api/json/v1/1/categories.php";

  const data = useFetch(url);

  console.log(data);

  return (
    <div>
      <div className="categories">
        {data.results &&
          data.results.categories.map((cate) => (
            <div key={cate.id} className={`card_container ${cate.strCategory}`}>
              <div className="box">
                {" "}
                <img
                  className="img_box"
                  id={`${cate.strCategory}`}
                  src={cate.strCategoryThumb}
                  alt=""
                />{" "}
              </div>
              <div className="content">
                <h1 key={cate.id}>
                  {" "}
                  <option value=""></option>
                  <Link
                    className="card_Header"
                    to={`/home/${cate.strCategory}`}
                  >
                    {cate.strCategory}
                  </Link>{" "}
                </h1>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
