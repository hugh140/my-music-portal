import { useEffect, useState } from "react";

function useUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const serverUrl = import.meta.env.VITE_SERVER_URL;
    fetch(serverUrl + "admin", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => setUsers(res))
      .catch((err) => console.error(err));
  }, []);

  return users;
}

export default useUsers;
