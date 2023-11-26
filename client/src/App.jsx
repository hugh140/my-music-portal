import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "./pages/MainPage";
import BlogPage from "./pages/BlogPage";
import AdminPage from "./pages/upload/AdminPage";
import { BlogUpload } from "./pages/upload/BlogUpload";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/blog-example" element={<BlogPage />} />
        <Route path="/adminPanel" element={<AdminPage />} />
        <Route path="/adminPanel/upload/blog" element={<BlogUpload />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
