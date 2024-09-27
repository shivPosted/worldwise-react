import React, { createContext, useContext, useEffect, useState } from "react";
import { BASE_URL } from "./util";
const Context = createContext();
export default function CitiesContext({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        if (!res.ok) throw new Error(`${res.status}: ${res.statusText}`);
        const data = await res.json();
        setCities(data);
      } catch (err) {
        alert(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function loadCurrentCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      if (!res.ok) throw new Error(`${res.status}: ${res.statusText}`);
      const data = await res.json();
      console.log(data);
      setCurrentCity(data);
    } catch (err) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Context.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        loadCurrentCity,
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
