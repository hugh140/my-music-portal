import { useEffect, useState } from "react";

function useSoftware() {
  const [software, setSoftware] = useState([]);

  useEffect(() => {
    const serverUrl = import.meta.env.VITE_SERVER_URL;
    fetch(serverUrl + "software/")
      .then((res) => res.json())
      .then((res) => setSoftware(res))
      .catch((err) => console.error(err));
  }, []);

  return software;
}
export default useSoftware;
