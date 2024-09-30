import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import supabase from "../services/supabase";
const Context = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "fetchCities":
      console.log(action.payload);
      return {
        ...state,
        cities: action.payload,
      };
    case "setLoading":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "setCurrentCity":
      return {
        ...state,
        currentCity: action.payload,
      };
    case "deleteCity":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };
    case "addCity":
      return {
        ...state,
        cities: [...state.cities, action.payload],
      };
  }
}

export default function CitiesContext({ children }) {
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState,
  );
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
        dispatch({ type: "setLoading", payload: true });
        const { data, error } = await supabase
          .from("citytable_worldwise_react")
          .select("*");
        if (error) throw error;
        console.log(data);
        // setCities(data);
        dispatch({ type: "fetchCities", payload: data });
      } catch (error) {
        console.error(error);
      } finally {
        dispatch({ type: "setLoading", payload: false });
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
    try {
      // setIsLoading(true);
      dispatch({ type: "setLoading", payload: true });
      const { data, error } = await supabase
        .from("citytable_worldwise_react")
        .select("*")
        .eq("id", id);
      if (error) throw error;
      const city = data.at(0);
      // setCurrentCity(city);
      dispatch({ type: "setCurrentCity", payload: city });
    } catch (err) {
      alert(err.message);
    } finally {
      dispatch({ type: "setLoading", payload: false });
    }
  }

  async function createNewCity(cityObj) {
    try {
      // setIsLoading(true);
      dispatch({ type: "setLoading", payload: true });
      const { data, error } = await supabase
        .from("citytable_worldwise_react")
        .insert([cityObj])
        .select("*");
      if (error) throw error;
      // setCities((cities) => [...cities, cityObj]);
      dispatch({ type: "addCity", payload: cityObj });
      console.log(data);
    } catch (error) {
      alert("there was an error creating new  city");
      console.error(error);
    } finally {
      // setIsLoading(false);
      dispatch({ type: "setLoading", payload: false });
    }
  }

  async function deleteCity(id) {
    try {
      // setIsLoading(true);
      dispatch({ type: "setLoading", payload: true });
      const { data, error } = await supabase
        .from("citytable_worldwise_react")
        .delete()
        .eq("id", id)
        .select("*");
      if (error) throw error;
      // setCities((cities) => {
      //   return cities.filter((city) => city.id !== id);
      // });
      dispatch({ type: "deleteCity", payload: id });
    } catch (err) {
      alert("there was an error deleting the city");
      console.error(err);
    } finally {
      // setIsLoading(false);
      dispatch({ type: "setLoading", payload: false });
    }
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
