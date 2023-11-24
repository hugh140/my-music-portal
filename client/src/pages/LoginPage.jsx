import { useState } from "react";
import Template from "../components/template/template";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function LoginPage() {
  const [showPass, setShowPass] = useState(false);

  const handleShowPass = () => setShowPass(!showPass);

  async function logUser(evt) {
    evt.preventDefault();
    const formData = new FormData(evt.target);

    const email = formData.get("email");
    const pass = formData.get("pass");
    const serverUrl = import.meta.env.VITE_SERVER_URL;

    try {
      let response = await fetch(
        serverUrl + `admin/login?email=${email}&password=${pass}`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      response = await response.text();
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Template navbar={false} footer={false}>
      <div className="mx-auto flex h-full w-3/4 items-center justify-center md:w-1/2 lg:w-1/3">
        <div className="w-full">
          <h1 className="mb-10 text-center text-4xl">
            Inicio de Sesión de Administrador
          </h1>
          <form onSubmit={logUser}>
            <label htmlFor="email">Correo Electrónico:</label>
            <br />
            <input
              type="text"
              name="email"
              id="email"
              className="mb-4 mt-1 w-full rounded border-2 border-zinc-500 p-1"
              placeholder="xyz@123.com"
            />
            <br />
            <label htmlFor="pass">Contraseña:</label>
            <br />
            <div className="flex flex-row">
              <input
                type={showPass ? "text" : "password"}
                name="pass"
                id="pass"
                className="mb-4 mt-1 w-full rounded border-2 border-zinc-500 p-1"
              />
              <span
                className="cursor-pointer p-2 hover:text-blue-500"
                onClick={handleShowPass}
              >
                <FontAwesomeIcon icon={showPass ? faEye : faEyeSlash} />
              </span>
            </div>
            <input
              type="submit"
              value="Iniciar Sesión"
              className="w-full rounded border-2 border-black bg-zinc-600 p-2 text-white
              hover:bg-zinc-700 active:bg-white active:text-black"
            />
          </form>
        </div>
      </div>
    </Template>
  );
}
export default LoginPage;
