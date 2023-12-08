import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function EmailForm() {
  const [alert, setAlert] = useState(null);
  const [loader, setLoader] = useState(false);

  function setInvalidMessage(message, event) {
    event.target.setCustomValidity(message);
  }

  async function sendEmail(event) {
    event.preventDefault();
    setLoader(true);
    try {
      const formData = new FormData(event.target);
      const uri = new URLSearchParams();
      const serverUrl = import.meta.env.VITE_SERVER_URL;
      uri.append("email", formData.get("email"));
      uri.append("name", formData.get("name"));

      let response = await fetch(`${serverUrl}email/subscription?${uri}`, {
        method: "POST",
      });
      response = await response.json();
      setLoader(false);
      setTimeout(() => setAlert(null), 2500);
      if (response.ok) setAlert("¡Te has suscrito correctamente!");
      else throw response.message;
    } catch (e) {
      setAlert(e);
    }
  }

  return (
    <article className="mb-5 mt-12">
      <h2 className="text-xl">¡Suscríbete, es gratis!</h2>
      <p className="mb-3">
        Así podrás enterarte de las últimas publicaciones por correo.
      </p>
      <form onSubmit={sendEmail}>
        <label className="mb-1 block" htmlFor="name">
          Nombre:
        </label>
        <input
          className="w-full rounded-md border-2 border-neutral-800 px-2 py-1 text-black
          invalid:text-red-500"
          placeholder="Antonio"
          type="text"
          name="name"
          id="name"
          pattern="^[a-zA-Z\s'\-]{1,}$"
          onInvalid={(event) =>
            setInvalidMessage(
              "El nombre es incorrecto, no se aceptan caracteres especiales.",
              event
            )
          }
          onInput={(event) => setInvalidMessage("", event)}
          required
        />
        <label className="my-1 block" htmlFor="email">
          Correo electrónico:
        </label>
        <input
          className="w-full rounded-md border-2 border-neutral-800 px-2 py-2 text-black
          invalid:text-red-500"
          placeholder="xyz123@foo.com"
          type="email"
          name="email"
          id="email"
          onInvalid={(event) =>
            setInvalidMessage("El correo electrónico es incorrecto.", event)
          }
          onInput={(event) => setInvalidMessage("", event)}
          required
        />
        <button
          className="mt-3 w-full rounded-md bg-neutral-700 p-3 hover:bg-white hover:text-black
          md:w-auto"
          type="submit"
        >
          {loader ? <FontAwesomeIcon icon={faSpinner} spin /> : "Suscribirse"}
        </button>
        <h1 className="mt-3 text-white">{alert}</h1>
      </form>
    </article>
  );
}
export default EmailForm;
