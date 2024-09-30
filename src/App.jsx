import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./components/Login";
import ListofCities from "./components/ListofCities";
import ListofCountries from "./components/ListofCountries";
import CityDetailsCard from "./components/CityDetailsCard";
import Form from "./components/Form";
import CitiesContext from "./components/CitiesContext";
import { AuthProvider } from "./components/AuthContext";

function App() {
  return (
    <CitiesContext>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* NOTE: / in path is used to define root path in Routes*/}
            <Route index element={<Homepage />} />{" "}
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/product" element={<Product />} />
            <Route path="/app" element={<AppLayout />}>
              <Route path="cities" element={<ListofCities />} />
              <Route path="cities/:id" element={<CityDetailsCard />} />
              <Route index element={<Navigate to="cities" />} />{" "}
              {/* NOTE: Navigate is used to redirect to someplace when a path is opened */}
              <Route path="form" element={<Form />} />
              <Route path="countries" element={<ListofCountries />} />
            </Route>
            {/* NOTE: * in path is used to define any other urls that are not defined in Routes*/}
            <Route path="*" element={<PageNotFound />} />{" "}
            <Route path="/login" element={<Login />} />{" "}
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </CitiesContext>
  );
}

export default App;
