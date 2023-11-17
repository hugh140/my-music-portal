import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "./pages/MainPage";
import BlogPage from "./pages/BlogPage";
import UploadPage from "./pages/upload/UploadPage";
import { BlogUpload } from "./pages/upload/BlogUpload";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/blog-example" element={<BlogPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/upload/blog" element={<BlogUpload />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
