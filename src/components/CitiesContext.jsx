import React, { createContext, useContext, useEffect, useReducer } from "react";

import supabase from "../services/supabase"; //NOTE: importing supabase client from setup in services folder

const Context = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  isError: false,
  errorMessage: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "error":
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload,
        isError: true,
      };
    case "error/remove":
      return {
        ...state,
        isError: false,
        errorMessage: null,
      };
    case "cities/loaded":
      console.log(action.payload);
      return {
        ...state,
        cities: action.payload,
        isLoading: false,
        isError: false,
        errorMessage: null,
      };
    case "loading":
      return {
        ...state,
        isLoading: true,
        isError: false,
        errorMessage: null,
      };
    case "city/current":
      return {
        ...state,
        currentCity: action.payload,
        isLoading: false,
        isError: false,
        errorMessage: null,
      };
    case "city/deleted":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        isLoading: false,
        isError: false,
        errorMessage: null,
      };
    case "city/added":
      return {
        cities: [...state.cities, action.payload],
        isLoading: false,
        currentCity: action.payload,
        isError: false,
        errorMessage: null,
      };
    default:
      throw new Error("The action type is not mathed for cities reducer");
  }
}

export default function CitiesContext({ children }) {
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  const [{ cities, isLoading, currentCity, isError, errorMessage }, dispatch] =
    useReducer(reducer, initialState);
  // NOTE: only for testin data with json--server for fake api generation
  // useEffect(() => {
  //   async function fetchCities() {
  //     try {
  //       setIsLoading(true);
  //       const res = await fetch(`${BASE_URL}/cities`);
  //       if (!res.ok) throw new Error(`${res.status}: ${res.statusText}`);
  //       const data = await res.json();
  //       setCities(data);
  //     } catch (err) {
  //       alert(err.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  //   fetchCities();
  // }, []);

  useEffect(() => {
    async function fetchCities() {
      try {
        // setIsLoading(true);
        dispatch({ type: "loading" });
        const { data, error } = await supabase
          .from("citytable_worldwise_react")
          .select("*");
        if (error) throw error;
        console.log(data);
        // setCities(data);
        dispatch({ type: "cities/loaded", payload: data });
      } catch (error) {
        console.error(error);
        dispatch({ type: "error", payload: error.message });
      }
    }

    fetchCities();
  }, []);

  // async function loadCurrentCity(id) {
  //   try {
  //     setIsLoading(true);
  //     const res = await fetch(`${BASE_URL}/cities/${id}`);
  //     if (!res.ok) throw new Error(`${res.status}: ${res.statusText}`);
  //     const data = await res.json();
  //     console.log(data);
  //     setCurrentCity(data);
  //   } catch (err) {
  //     alert(err.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  async function loadCurrentCity(id) {
    if (currentCity.id === Number(id)) return; //NOTE: as id passed in loadCurrentCity is fetched from params it is a string, we don't want to fetch data from api if same city is clicked again
    try {
      // setIsLoading(true);
      dispatch({ type: "loading" });
      const { data, error } = await supabase
        .from("citytable_worldwise_react")
        .select("*")
        .eq("id", id);
      if (error) throw error;
      const city = data.at(0);
      // setCurrentCity(city);
      dispatch({ type: "city/current", payload: city });
    } catch (err) {
      // alert(err.message);
      dispatch({
        type: "error",
        payload: `Can't load country due to: ${err.message}`,
      });
    }
  }

  async function createNewCity(cityObj) {
    try {
      // setIsLoading(true);
      dispatch({ type: "loading" });
      const { data, error } = await supabase
        .from("citytable_worldwise_react")
        .insert([cityObj])
        .select("*");
      if (error) throw error;
      // setCities((cities) => [...cities, cityObj]);
      dispatch({ type: "city/added", payload: cityObj });
      console.log(data);
    } catch (error) {
      // alert("there was an error creating new  city");
      dispatch({
        type: "error",
        payload: "There was an error creating new  city",
      });
      console.error(error);
    }
  }

  async function deleteCity(id) {
    try {
      // setIsLoading(true);
      dispatch({ type: "loading" });
      const { data, error } = await supabase
        .from("citytable_worldwise_react")
        .delete()
        .eq("id", id)
        .select("*");
      if (error) throw error;
      // setCities((cities) => {
      //   return cities.filter((city) => city.id !== id);
      // });
      dispatch({ type: "city/deleted", payload: id });
    } catch (err) {
      // alert("there was an error deleting the city");
      dispatch({
        type: "error",
        payload: "There was an error deleting the city",
      });
      console.error(err);
    }
  }

  function handleRemoveErrorCities() {
    dispatch({ type: "error/remove" });
  }

  return (
    <Context.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        loadCurrentCity,
        createNewCity,
        deleteCity,
        isError,
        errorMessage,
        handleRemoveErrorCities,
      }}
    >
      {children}
    </Context.Provider>
  );
}

function useCitiesContext() {
  const context = useContext(Context);
  if (context === undefined)
    throw new Error("using citiescontext outside where it is accessible");
  return context;
}

export { CitiesContext, useCitiesContext };
