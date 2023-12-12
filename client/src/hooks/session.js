import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useSession(redirect) {
  const navigate = useNavigate();
  useEffect(() => {
    const serverUrl = import.meta.env.VITE_SERVER_URL;
    fetch(serverUrl + "admin/session", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.ok) navigate(redirect);
      })
      .catch((err) => console.error(err));
  }, [navigate, redirect]);
}

export default useSession;
