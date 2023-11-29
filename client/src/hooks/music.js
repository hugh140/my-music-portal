import { useEffect, useState } from "react";

function useMusic(limit) {
  const [music, setMusic] = useState([]);

  useEffect(() => {
    const serverURL = import.meta.env.VITE_SERVER_URL;
    fetch(serverURL + `music/headers?limit=${limit}`)
      .then((res) => res.json())
      .then((res) => setMusic(res));
  }, [limit]);

  return music;
}

export default useMusic;
