import { Toolbar } from "./components/Toolbar";
import { Routes, Route } from "react-router-dom";
import { ProductList } from "./pages/ProductList";
import { ProductDetails } from "./pages/ProductDetails";
import { Checkout } from "./pages/Checkout";

const App = () => {
  return (
    <>
      <Toolbar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </>
  );
};

export default App;
