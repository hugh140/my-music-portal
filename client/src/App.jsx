import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import BlogPage from "./pages/BlogPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />

        <Route path="/blog-example" element={<BlogPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
