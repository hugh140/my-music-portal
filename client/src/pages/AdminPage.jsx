import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

import UploadModal from "../components/adminPage/uploadModal";
import Template from "../components/template/template";

function AdminPage() {
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!document.cookie) navigate("/login?redirect=/adminPage");
  }, [navigate]);

  return (
    <>
      <UploadModal modal={modal} setModal={setModal} />
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
            className="ms-5 rounded border-2 border-black bg-zinc-100 p-2 
          text-black hover:bg-zinc-200"
          >
            <FontAwesomeIcon icon={faUsers} /> Registrar usuarios
          </button>
        </div>
      </Template>
    </>
  );
}
export default AdminPage;
