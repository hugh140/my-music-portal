import PropTypes from "prop-types";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

function EditUser({ handler, user }) {
  const [passForm, setPassForm] = useState(false);
  const [alert, setAlert] = useState(null);
  const setPass = (evt) => setPassForm(evt.target.checked);

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const serverUrl = import.meta.env.VITE_SERVER_URL;
      const formData = new FormData(evt.target);
      const uri = new URLSearchParams();
      const password = formData.get("password");
      uri.append("name", formData.get("name"));
      uri.append("email", user.email);
      uri.append("type", formData.get("type"));
      if (password) uri.append("password", password);

      let response = await fetch(`${serverUrl}admin/edit?${uri}`, {
        method: "PUT",
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
      <h1 className="mb-3 text-center text-2xl">Editar Usuario</h1>
      <label htmlFor="name">Nombre:</label>
      <br />
      <input
        type="text"
        name="name"
        id="name"
        defaultValue={user.name}
        className="mb-4 w-full rounded-md border-2 border-zinc-100 p-1"
      />
      <label htmlFor="type">Permiso:</label>
      <br />
      <select
        name="type"
        id="type"
        defaultValue={user.type}
        className="mb-4 w-full rounded-md border-2 border-zinc-100 p-1"
      >
        <option value="writter">Escritor</option>
        <option value="editor">Editor</option>
        <option value="superAdmin">Super Admin</option>
      </select>
      <label htmlFor="pass">¿Cambiar contraseña?</label>
      <input
        className="ms-3"
        type="checkbox"
        name="pass"
        id="pass"
        onChange={setPass}
      />
      <br />
      <br />
      {passForm && (
        <>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            name="password"
            id="password"
            className="mb-4 w-full rounded-md border-2 border-zinc-100 p-1"
          />
        </>
      )}
      <button
        type="submit"
        className="my-4 w-full rounded-md border-2 border-zinc-800 p-2 
      hover:bg-zinc-800 hover:text-white active:bg-white active:text-black"
      >
        Editar Usuario
      </button>
      <button
        type="submit"
        className="w-full rounded-md border-2 border-red-800 p-2 text-red-800 
      hover:bg-red-800 hover:text-white active:bg-white active:text-black"
        onClick={() => handler(false)}
      >
        Cancelar
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

export default EditUser;

EditUser.propTypes = {
  handler: PropTypes.func,
  user: PropTypes.object,
};
