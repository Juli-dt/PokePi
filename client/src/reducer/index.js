const initialState = {
  pokemons: [],
  allPokemons: [],
  types: [],
  details: {},
  loading: false,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
      };
    case "GET_TYPES":
      return {
        ...state,
        types: action.payload,
      };
    case "POST_POKEMON":
      return {
        ...state,
      };
    case "FILTER_POKEMONS_BY_TYPES":
      const allPokemons = state.allPokemons;
      const typesFiltered =
        action.payload === "All"
          ? allPokemons
          : allPokemons.filter((el) => el.types.includes(action.payload));
      return {
        ...state,
        pokemons: typesFiltered,
      };
    case "FILTER_CREATED":
      const allPokemons2 = state.allPokemons;
      const createdFilter =
        action.payload === "created"
          ? allPokemons2.filter((el) => el.created)
          : allPokemons2.filter((el) => !el.created);
      return {
        ...state,
        pokemons: action.payload === "All" ? state.allPokemons2 : createdFilter,
      };
    case "ORDER_BY_NAME":
      let sortedArr =
        action.payload === "asc"
          ? state.pokemons.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (a.name < b.name) {
                return -1;
              }
              return 0;
            })
          : state.pokemons.sort(function (a, b) {
              if (a.name < b.name) {
                return 1;
              }
              if (a.name > b.name) {
                return -1;
              }
              return 0;
            });
      return {
        ...state,
        pokemons: sortedArr,
      };
    case "GET_NAME_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
      };
    case "GET_DETAILS":
      return {
        ...state,
        details: action.payload,
      };
    case "ORDER_BY_ATTACK":
      let sortedArr2 =
        action.payload === "desc"
          ? state.pokemons.sort(function (a, b) {
              if (a.attack > b.attack) {
                return 1;
              }
              if (a.attack < b.attack) {
                return -1;
              }
              return 0;
            })
          : state.pokemons.sort(function (a, b) {
              if (a.attack > b.attack) {
                return -1;
              }
              if (a.attack < b.attack) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        pokemons: sortedArr2,
      };

    default:
      return state;
  }
}

export default rootReducer;
