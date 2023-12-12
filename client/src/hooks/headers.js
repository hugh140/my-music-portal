import { useEffect, useState } from "react";

function useHeaders(start, end) {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const serverURL = import.meta.env.VITE_SERVER_URL;
    fetch(serverURL + `api/blogs?start=${start}&end=${end}`)
      .then((res) => res.json())
      .then((res) => {
        const tempBlogs = [...blogs];
        for (const blgs of res) tempBlogs.push(blgs);
        setBlogs(tempBlogs);
      })
      .catch((err) => console.error(err));
  }, [start, end]);

  return blogs;
}
export default useHeaders;
