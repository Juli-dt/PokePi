import React from "react";
import "./Loading.css";
import loading from "../../img/loading.gif";
import { Link } from "react-router-dom";
import logo from "../../img/Pokelogo.png";

const Loading = () => {
  return(
    <div class="loading">
      <Link to="/home">
        <img src={logo} alt="Pokémon Logo" class="logo" />
      </Link>
      <img src={loading} alt="Loading" class="pokeball" />
    </div>
  );
};

export default Loading;
