import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import Template from "../../components/template/template";
import { Link } from "react-router-dom";

const buttonOptions = [
  { name: "Blog", link: "/adminPanel/upload/blog" },
  { name: "Software", link: "/" },
];

function AdminPage() {
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (!document.cookie) window.location.href = "/login";
  }, []);

  return (
    <>
      <div
        className="fixed top-0 z-10 h-full w-full bg-black bg-opacity-30"
        style={{ display: modal ? "block" : "none" }}
        onClick={() => setModal(false)}
      >
        <div className="flex h-full place-content-center place-items-center">
          <div className="rounded-lg border-2 border-black bg-white p-5">
            <div
              className="flex cursor-pointer justify-end 
            text-xl hover:text-red-600"
              onClick={() => setModal(false)}
            >
              <FontAwesomeIcon icon={faXmark} />
            </div>
            <h2 className="text-xl font-bold">¿Qué deseas subir?</h2>
            {buttonOptions.map((option) => (
              <Link key={option.name} to={option.link}>
                <button
                  className="mt-2 w-full rounded border-2 p-2 hover:border-black 
                hover:bg-black hover:text-white"
                >
                  {option.name}
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Template footer={false} navbar={false}>
        <div className="mx-3 sm:mx-0">
          <h1 className="mb-3 text-center text-3xl">Panel Administrador</h1>
          <button
            className="rounded border-2 border-green-700 bg-green-50 p-2 text-green-600 
        hover:bg-green-100"
            onClick={() => setModal(true)}
          >
            <FontAwesomeIcon icon={faPlus} /> Publicar
          </button>
          <button
            className="ms-5 rounded border-2 border-black bg-green-50 p-2 text-black 
        hover:bg-zinc-200"
          >
            <FontAwesomeIcon icon={faUsers} /> Registrar usuarios
          </button>
        </div>
      </Template>
    </>
  );
}
export default AdminPage;
