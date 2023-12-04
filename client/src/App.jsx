import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "./pages/MainPage";
import BlogPage from "./pages/BlogPage";
import AdminPage from "./pages/admin/AdminPage";
import { BlogUpload } from "./pages/admin/BlogUpload";
import LoginPage from "./pages/admin/LoginPage";
import GeneralBlogs from "./pages/general/GeneralBlogs";
import MusicPage from "./pages/MusicPage";
import GeneralMusic from "./pages/general/GeneralMusic";
import { BlogEdit } from "./pages/admin/BlogEdit";
import SoftwareUpload from "./pages/admin/SoftwareUpload";
import GeneralPages from "./pages/general/GeneralPages";
import SoftwareEdit from "./pages/admin/SoftwareEdit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/blog/:id" element={<BlogPage />} />
        <Route path="/music/:id" element={<MusicPage />} />
        <Route path="/general/blogs" element={<GeneralBlogs />} />
        <Route path="/general/music" element={<GeneralMusic />} />
        <Route path="/general/software" element={<GeneralPages />} />
        <Route path="/adminPanel" element={<AdminPage />} />
        <Route path="/adminPanel/upload/blog" element={<BlogUpload />} />
        <Route path="/adminPanel/edit/blog/:id" element={<BlogEdit />} />
        <Route
          path="/adminPanel/upload/software"
          element={<SoftwareUpload />}
        />
        <Route path="/adminPanel/edit/software/:name" element={<SoftwareEdit />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
