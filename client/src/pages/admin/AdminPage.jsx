import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import AdminModal from "../../components/adminPage/AdminModal";
import BlogList from "../../components/adminPage/BlogsList";
import SoftwareList from "../../components/adminPage/SoftwareList";
import Template from "../../components/template/Template";
import useSession from "../../hooks/session";

const buttonOptions = [
  { name: "Blog", link: "/adminPanel/upload/blog" },
  { name: "Software", link: "/adminPanel/upload/software" },
];

function AdminPage() {
  const [modalUpload, setModalUpload] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [alert, setAlert] = useState(null);
  const [loader, setLoader] = useState(false);
  const [blogId, setBlogId] = useState(null);
  const [appName, setAppName] = useState(null);
  const [postSelector, setPostSelector] = useState(
    <BlogList handleDelete={handleDeleteBlog} />
  );

  useSession("/login?redirect=/adminPanel");

  function handleDeleteBlog(blogId) {
    setAppName(null);
    setBlogId(blogId);
    setModalDelete(true);
  }

  function handleDeleteApp(appName) {
    setBlogId(null);
    setAppName(appName);
    setModalDelete(true);
  }

  function handleLogOut() {
    document.cookie = "HR=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    window.location.reload();
  }

  async function deleteBlog() {
    try {
      setLoader(true);
      const serverUrl = import.meta.env.VITE_SERVER_URL;
      const fetchUri =
        serverUrl +
        (blogId ? "api/blog/" + blogId : "software/delete/" + appName);
      let response = await fetch(fetchUri, {
        method: "DELETE",
        credentials: "include",
      });
      response = await response.json();
      if (response.ok) {
        setAlert("Se ha eliminado correctamente.");
        window.location.reload();
      } else throw response.message;
      setLoader(false);
    } catch (e) {
      setLoader(false);
      setAlert(e);
      setTimeout(() => setAlert(null), 1000);
    }
  }

  return (
    <>
      <AdminModal modal={modalUpload} setModal={setModalUpload}>
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
      </AdminModal>
      <AdminModal modal={modalDelete} setModal={setModalDelete}>
        <h2 className="text-xl font-bold">¿Deseas eliminar este blog?</h2>
        <div className="mt-3 flex w-full flex-row gap-3">
          <button
            className="w-full rounded-lg border-2 border-red-500 bg-red-500 p-2 
            text-white hover:bg-white hover:font-bold hover:text-red-500"
            onClick={deleteBlog}
          >
            {loader ? (
              <FontAwesomeIcon icon={faSpinner} spin={true} />
            ) : (
              "Eliminarlo"
            )}
          </button>
          <button
            className="w-full rounded-lg border-2 border-black bg-black p-2 
            text-white hover:bg-white hover:font-bold hover:text-black"
            onClick={() => setModalDelete(false)}
          >
            Cancelar
          </button>
        </div>
        {alert && <div className="mt-4 p-2">{alert}</div>}
      </AdminModal>
      <Template footer={false} navbar={false}>
        <h1 className="my-3 text-center text-3xl">Panel Administrador</h1>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <button
            className="rounded border-2 border-green-700 bg-green-50 p-2 text-green-600 
            hover:bg-green-600 hover:text-white"
            onClick={() => setModalUpload(true)}
          >
            <FontAwesomeIcon icon={faPlus} /> Publicar
          </button>
          <a
            className="rounded border-2 border-black bg-zinc-100 p-2 
            text-center text-black hover:bg-black hover:text-white"
            href="/adminPanel/users"
          >
            <FontAwesomeIcon icon={faUsers} /> Administrar usuarios
          </a>
          <button
            className="rounded border-2 border-red-700 bg-white p-2 text-red-600 
            hover:bg-red-600 hover:text-white"
            onClick={handleLogOut}
          >
            <FontAwesomeIcon icon={faRightFromBracket} /> Cerrar Sesión
          </button>
        </div>
        <div className="flex flex-row">
          <button
            className="mt-5 w-full border-b-2 p-2 text-2xl 
          hover:border-zinc-500"
            onClick={() =>
              setPostSelector(<BlogList handleDelete={handleDeleteBlog} />)
            }
          >
            Blogs
          </button>
          <button
            className="mt-5 w-full border-b-2 p-2 text-2xl 
          hover:border-zinc-500"
            onClick={() =>
              setPostSelector(<SoftwareList handleDelete={handleDeleteApp} />)
            }
          >
            Software
          </button>
        </div>
        <div>
          <section className="relative flex flex-wrap place-content-center gap-3 p-5 md:place-content-center">
            {postSelector}
          </section>
        </div>
      </Template>
    </>
  );
}
export default AdminPage;
