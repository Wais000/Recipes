import Header from "../components/Header";
import Sections from "../components/Sections";
import Footer from "../components/Footer";
import Home from "../components/pages/Home";
import Ingredient from "../components/pages/Ingredient";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import SearchResults from "../components/SearchResults";






const Routings =()=>
(
<div className="main">
<Router>
<Header/>
<Routes>
<Route path="/" element={<Home/>}/>
<Route path="/home/:strCategory" element={<Sections/>}/>
<Route path="/drop-down-lists/:strCategory" element={<Sections/>}/>
<Route path="/sections/:idMeal" element={<Ingredient/>}/>
<Route path="/search-results" element={<SearchResults/>}/>
<Route path="/search-results/:strCategory" element={<Sections/>}/>
</Routes>
<Footer/>
</Router>
</div>
    )


export default Routings