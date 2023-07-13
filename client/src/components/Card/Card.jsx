import React from "react";
import { Link } from "react-router-dom";
import "././Card.css";

export default function Card({ name, image, types, id }) {
  return (
    <body class="bodyCard">
      <div>
        <div class="Titulo">{name}</div>
        <div class="Subtitulo">{types.join(", ")}</div>
        <img
          src={image}
          alt="No se encuentra imagen"
          width="200px"
          height="250px"
        />
        <nav>
          <Link to={`pokemons/${id}`}>
            <button class="buttonCard">More</button>
          </Link>
        </nav>
      </div>
    </body>
  );
}
