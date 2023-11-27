import { useEffect, useState } from "react";

function useHeaders() {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const serverURL = import.meta.env.VITE_SERVER_URL;
    fetch(serverURL + "api/blogs?start=0&end=6")
      .then((res) => res.json())
      .then((res) => setBlogs(res));
  }, []);

  return blogs
}
export default useHeaders;
