import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { postPokemon, getTypes } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../img/Pokelogo.png";
import "./PokemonCreate.css";

export default function PokemonCreate() {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);
  const history = useHistory();
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    types: [],
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    image: "",
  });

  function validate(input) {
    let errors = {};
    if (!input.name) {
      errors.name = "Debes ingresar un nombre";
    } else if (!input.hp) {
      errors.hp = "Debes ingresar un HP";
    }
    return errors;
  }

  function handleSelect(e) {
    setInput({
      ...input,
      types: [...input.types, e.target.value],
    });
  }

  function handleDelete(el) {
    setInput({
      ...input,
      types: input.types.filter((types) => types !== el),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postPokemon(input));
    alert("Pokemon created");
    setInput({
      name: "",
      types: [],
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      height: "",
      weight: "",
      image: "",
    });
    history.push("/home");
  }

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        status: e.target.value,
      })
    );
  }

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  return (
    <body class="body4">
      <div>
        <Link to="/home">
          <button class="buttonCreate">Home</button>{" "}
        </Link>
        <div>
          <img src={logo} alt="Pokémon logo" class="logo" />
        </div>
        <h1 class="createPokemon">Create Pokemon</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label class="fontLabel">Name:</label>
            <input
              class="label"
              types="text"
              value={input.name}
              name="name"
              onChange={(e) => handleChange(e)}
            />
            {errors.name && <p>{errors.name}</p>})
          </div>
          <div>
            <label class="fontLabel">Types: </label>
            <select class="typesLabel" onChange={(e) => handleSelect(e)}>
              {types.map((types) => (
                <option key={types.id} value={types.name}>
                  {types.name}
                </option>
              ))}
            </select>
            <ul>
              <li>{input.types.map((el) => el + " ,")}</li>
            </ul>
          </div>
          {input.types.map((el) => (
            <div>
              <p>{el}</p>
              <button onClick={() => handleDelete(el)}>X</button>
            </div>
          ))}
          <div>
            <label class="fontLabel">HP:</label>
            <input
              class="label"
              type="number"
              value={input.hp}
              name="hp"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label class="fontLabel">Attack:</label>
            <input
              class="label"
              type="number"
              value={input.attack}
              name="attack"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label class="fontLabel">Defense:</label>
            <input
              class="label"
              type="number"
              value={input.defense}
              name="defense"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label class="fontLabel">Speed:</label>
            <input
              class="label"
              type="number"
              value={input.speed}
              name="speed"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label class="fontLabel">Height:</label>
            <input
              class="label"
              type="number"
              value={input.height}
              name="height"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label class="fontLabel">Weight:</label>
            <input
              class="label"
              type="number"
              value={input.weight}
              name="weight"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label class="fontLabel">Image:</label>
            <input
              class="label"
              type="text"
              value={input.image}
              name="image"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <button class="buttonCreate" type="submit">
            Create Pokemon
          </button>
        </form>
      </div>
    </body>
  );
}
