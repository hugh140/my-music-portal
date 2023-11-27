import { useEffect, useState } from "react";

function useBlog(id) {
  const [blog, setBlog] = useState([]);
  useEffect(() => {
    const serverURL = import.meta.env.VITE_SERVER_URL;
    fetch(serverURL + "api/blog/" + id)
      .then((res) => res.json())
      .then((res) => setBlog(res));
  }, [id]);

  return blog
}
export default useBlog;
