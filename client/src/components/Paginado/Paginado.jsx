import React from "react";
import "./Paginado.css";

export default function Paginado({ pokemonsPerPage, allPokemons, paginado }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allPokemons.length / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav class="pagination">
      {pageNumbers &&
        pageNumbers.map((number) => (
          <div key={number}>
            <button onClick={() => paginado(number)}>{number}</button>
          </div>
        ))}
    </nav>
  );
}
