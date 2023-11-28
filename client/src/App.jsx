import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "./pages/MainPage";
import BlogPage from "./pages/BlogPage";
import AdminPage from "./pages/AdminPage";
import { BlogUpload } from "./pages/BlogUpload";
import LoginPage from "./pages/LoginPage";
import GeneralPage from "./pages/GeneralPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/blog/:id" element={<BlogPage />} />
        <Route path="/adminPanel" element={<AdminPage />} />
        <Route path="/adminPanel/upload/blog" element={<BlogUpload />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/:type" element={<GeneralPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
