import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNamePokemons } from "../../actions";
import "./SearchBar.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleImputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getNamePokemons(name));
  }

  return (
    <div>
      <input
        class="barras2"
        type="text"
        placeholder="Search..."
        onChange={(e) => handleImputChange(e)}
      />
      <button
        class="buttonSearchBar"
        setName=""
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        Search
      </button>
    </div>
  );
}
