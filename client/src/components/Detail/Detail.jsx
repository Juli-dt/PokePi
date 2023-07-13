import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../../actions";
import { useEffect } from "react";
import "./Detail.css";

export default function Detail(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetails(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  const myPokemon = useSelector((state) => state.details);

  return (
    <body class="body3">
      <div>
        {Object.entries(myPokemon).length > 0 ? (
          <div>
            <h1 class="nombreDetail">
              <br /> {myPokemon.name.toUpperCase()}
            </h1>
            <img
              src={myPokemon.image}
              alt="pokemon"
              width="380px"
              height="450px"
            />
            <div class="infoDetail">
              <h4 class="typesDetail">
                Types: {""}
                {!myPokemon.created
                  ? myPokemon.types + "  "
                  : myPokemon.types.map((el) => el.name + "  ")}
              </h4>
              <h4>HP: {myPokemon.hp}</h4>
              <h4>Attack: {myPokemon.attack}</h4>
              <h4>Defense: {myPokemon.defense}</h4>
              <h4>Speed: {myPokemon.speed}</h4>
              <h4>Height: {myPokemon.height}</h4>
              <h4>Weight: {myPokemon.weight}</h4>
            </div>
          </div>
        ) : (
          <p>Loading..</p>
        )}

        <Link to="/home">
          <button class="buttonDetail">Back</button>
        </Link>
      </div>
    </body>
  );
}
