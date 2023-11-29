import { useEffect, useState } from "react";

function useRelease(id) {
  const [release, setRelease] = useState({});

  useEffect(() => {
    fetch(`http://localhost:3000/music/release/${id}`)
      .then((res) => res.json())
      .then((res) => setRelease(res));
  }, [id]);

  return release;
}

export default useRelease;
