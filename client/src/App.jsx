import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "./pages/MainPage";
import BlogPage from "./pages/BlogPage";
import AdminPage from "./pages/AdminPage";
import { BlogUpload } from "./pages/BlogUpload";
import LoginPage from "./pages/LoginPage";
import GeneralBlogs from "./pages/general/GeneralBlogs";
import MusicPage from "./pages/MusicPage";
import GeneralMusic from "./pages/general/GeneralMusic";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/blog/:id" element={<BlogPage />} />
        <Route path="/adminPanel" element={<AdminPage />} />
        <Route path="/adminPanel/upload/blog" element={<BlogUpload />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/general/blogs" element={<GeneralBlogs />} />
        <Route path="/music/:id" element={<MusicPage />} />
        <Route path="/general/music" element={<GeneralMusic />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
