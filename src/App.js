import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Category from "./pages/Category";
import Product from "./pages/Product";
import Section from "./pages/Section";
import Error from "./pages/Error";
import Header from "./components/header/Header";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Register from "./pages/Register";
import LoginModal from "./components/modals/LoginModal";

export default function App() {
  return (
    <div id="App">
      <LoginModal />
      <Header />
      <div id="outer-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryId" element={<Category />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/section/:sectionId" element={<Section />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </div>
    </div>
  );
}
