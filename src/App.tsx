import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import CategoryPage from "./components/categories/CategoryPage";
import SubcategoryPage from "./components/categories/SubcategoryPage";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories/:categoryId" element={<CategoryPage />} />
          <Route
            path="/categories/:categoryId/:subcategoryId"
            element={<SubcategoryPage />}
          />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
