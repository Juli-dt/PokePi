import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemons,
  getTypes,
  filterPokemonsByTypes,
  filterCreated,
  orderByName,
  orderByAttack,
} from "../../actions";
import { Link } from "react-router-dom";
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";
import "./Home.css";
import logo from "../../img/Pokelogo.png";
import Cards from "../Cards/Cards";

export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);
  //Constantes para el paginado
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(12);
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = allPokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );
  //Constante para ordenar
  const [, setOrden] = useState("");

  //Para el paginado
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //Traer los types
  const types = useSelector((state) => state.types);
  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  //Traer los Pokemon
  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  //Handle para recargar todos los Pokemon
  function handleClick(e) {
    dispatch(filterPokemonsByTypes(e.target.value));
  }

  //Handle para filtrar los Pokemon por tipo
  function handleFilterTypes(e) {
    dispatch(filterPokemonsByTypes(e.target.value));
  }

  //Handle para filtrar pokemons por attack

  function handleOrderByAttack(e) {
    e.preventDefault();
    dispatch(orderByAttack(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  //Handle para filtrar por creados
  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value));
  }

  //Handle para ordenar alfabeticamente
  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  return (
    <body class="body2">
      <div>
        <Link to="/pokemons">
          <button class="buttonDetalles">Create Pokemon</button>
        </Link>
        <img src={logo} alt="Pokémon logo" class="logo" />
        <button
          class="buttonDetalles"
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Reload Pokemons
        </button>
        <div>
          <select class="barras" onChange={(e) => handleSort(e)}>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
          <select class="barras" onChange={(e) => handleOrderByAttack(e)}>
            <option value="desc">Weak to Strong</option>
            <option value="asc">Strong to Weak</option>
          </select>
          <select class="barras" onChange={(e) => handleFilterTypes(e)}>
            <option disabled>Filter By Type</option>
            <option value="All">All Types</option>
            {types.map((types) => (
              <option value={types.name} key={types.id}>
                {types.name[0].toUpperCase() + types.name.slice(1)}
              </option>
            ))}
          </select>
          <select class="barras" onChange={(e) => handleFilterCreated(e)}>
            <option value="All">All</option>
            <option value="created">Created</option>
            <option value="api">Existing</option>
          </select>
          <SearchBar />
          <Paginado
            pokemonsPerPage={pokemonsPerPage}
            allPokemons={allPokemons}
            paginado={paginado}
          />

          <Cards pokemons={currentPokemons} />
        </div>
      </div>
    </body>
  );
}
