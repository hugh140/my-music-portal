import { useEffect, useState } from "react";

function useRelease(id) {
  const [release, setRelease] = useState({});

  useEffect(() => {
    const serverUrl = import.meta.env.VITE_SERVER_URL;
    fetch(`${serverUrl}music/release/${id}`)
      .then((res) => res.json())
      .then((res) => setRelease(res))
      .catch((err) => console.error(err))
  }, [id]);

  return release;
}

export default useRelease;
