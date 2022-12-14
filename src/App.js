import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Category from "./pages/Category";
import Product from "./pages/Product";
import Section from "./pages/Section";
import Error from "./pages/Error";

function App() {
  return (
    <div id="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:categoryId" element={<Category />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/section/:sectionId" element={<Section />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
