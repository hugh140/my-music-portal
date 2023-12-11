import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useSession(redirect) {
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const serverUrl = import.meta.env.VITE_SERVER_URL;
      fetch(serverUrl + "admin/session", {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((res) => {
          if (!res.ok) navigate(redirect);
        });
    } catch (e) {
      console.error(e);
    }
  }, [navigate, redirect]);
}

export default useSession;
