import React, { createContext, useContext, useEffect, useState } from "react";
import { BASE_URL } from "./util";
import supabase from "../services/supabase";
const Context = createContext();
export default function CitiesContext({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

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
        setIsLoading(true);
        const { data, error } = await supabase
          .from("citytable_worldwise_react")
          .select("*");
        if (error) throw error;
        console.log(data);
        setCities(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
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
      setIsLoading(true);
      const { data, error } = await supabase
        .from("citytable_worldwise_react")
        .select("*")
        .eq("id", id);
      if (error) throw error;
      const city = data.at(0);
      setCurrentCity(city);
    } catch (err) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function createNewCity(cityObj) {
    try {
      const { data, error } = await supabase
        .from("citytable_worldwise_react")
        .insert([cityObj])
        .select("*");
      if (error) throw error;
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  //   async function deleteCity(id)
  // {
  //     try{
  //       const {data, error} = await supabase.from('citytable_worldwise_react').delete
  //     }
  //     catch(err)
  //   {
  //       console.error(err)
  //     }
  //   }

  return (
    <Context.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        loadCurrentCity,
        createNewCity,
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
