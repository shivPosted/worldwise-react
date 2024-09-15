import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./components/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* NOTE: / in path is used to define root path in Routes*/}
        <Route path="/" element={<Homepage />} />{" "}
        <Route path="pricing" element={<Pricing />} />
        <Route path="product" element={<Product />} />
        <Route path="app" element=<AppLayout /> />
        {/* NOTE: * in path is used to define any other urls that are not defined in Routes*/}
        <Route path="*" element={<PageNotFound />} />{" "}
        <Route path="/login" element={<Login />} />{" "}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
