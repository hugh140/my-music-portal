import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

function RegistryUser() {
  const [alert, setAlert] = useState(null);

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const serverUrl = import.meta.env.VITE_SERVER_URL;
      const formData = new FormData(evt.target);
      const uri = new URLSearchParams();
      uri.append("name", formData.get("name"));
      uri.append("email", formData.get("email"));
      uri.append("type", formData.get("type"));
      uri.append("password", formData.get("password"));

      let response = await fetch(`${serverUrl}admin/register?${uri}`, {
        method: "POST",
        credentials: "include",
      });
      response = await response.json();
      if (response.ok) window.location.reload();
      else throw response.message;
    } catch (e) {
      setAlert(String(e));
      setTimeout(() => setAlert(null), 3000);
    }
  }

  return (
    <form className="md:w-1/3" onSubmit={handleSubmit}>
      <h1 className="mb-3 text-center text-2xl">Registrar Usuario</h1>
      <label htmlFor="name">Nombre:</label>
      <br />
      <input
        type="text"
        name="name"
        id="name"
        className="mb-4 w-full rounded-md border-2 border-zinc-100 p-1"
        required
      />
      <label htmlFor="name">Correo Electrónico:</label>
      <br />
      <input
        type="text"
        name="email"
        id="email"
        className="mb-4 w-full rounded-md border-2 border-zinc-100 p-1"
        required
      />
      <label htmlFor="password">Contraseña:</label>
      <input
        type="password"
        name="password"
        id="password"
        className="mb-4 w-full rounded-md border-2 border-zinc-100 p-1"
        required
      />
      <label htmlFor="type">Permiso:</label>
      <br />
      <select
        name="type"
        id="type"
        className="mb-4 w-full rounded-md border-2 border-zinc-100 p-1"
        required
      >
        <option value="writter">Escritor</option>
        <option value="editor">Editor</option>
        <option value="superAdmin">Super Admin</option>
      </select>
      <br />
      <button
        type="submit"
        className="my-4 w-full rounded-md border-2 border-zinc-500 p-2 
      hover:bg-zinc-500 hover:text-white active:bg-white active:text-black"
      >
        Registrar Usuario
      </button>
      {alert && (
        <div className="mt-4 text-center text-red-600">
          <FontAwesomeIcon icon={faCircleExclamation} className="text-2xl" />
          <br />
          {alert}
        </div>
      )}
    </form>
  );
}

export default RegistryUser;
