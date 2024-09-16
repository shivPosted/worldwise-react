import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./components/Login";
import ListofCities from "./components/ListofCities";
import Countries from "./components/Countries";
import { useEffect, useState } from "react";

const BASE_URL = "http://localhost:9000";

function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        if (!res.ok) throw new Error(`${res.status}: ${res.statusText}`);

        const data = await res.json();
        setCities(data);
        console.log(data);
      } catch (err) {
        alert(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        {/* NOTE: / in path is used to define root path in Routes*/}
        <Route index element={<Homepage />} />{" "}
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/product" element={<Product />} />
        <Route path="/app" element={<AppLayout />}>
          <Route
            path="cities"
            element={<ListofCities cities={cities} isLoading={isLoading} />}
          />
          <Route
            index
            element={<ListofCities cities={cities} isLoading={isLoading} />}
          />
          <Route path="form" element={<p>Form </p>} />
          <Route path="countries" element={<Countries />} />
        </Route>
        {/* NOTE: * in path is used to define any other urls that are not defined in Routes*/}
        <Route path="*" element={<PageNotFound />} />{" "}
        <Route path="/login" element={<Login />} />{" "}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
