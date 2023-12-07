import { useState, useEffect } from "react";
import Template from "../../components/template/template";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import useUsers from "../../hooks/users";
import EditUser from "../../components/adminPage/EditUser";
import RegistryUser from "../../components/adminPage/RegistryUser";
import AdminModal from "../../components/adminPage/AdminModal";

import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

function UserPage() {
  const [panel, setPanel] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState(null);
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();
  const users = useUsers();

  useEffect(() => {
    if (!document.cookie) navigate("/login?redirect=/adminPanel/users");
  }, [navigate]);

  function handleEdit(user) {
    setPanel(true);
    setUserInfo(user);
  }

  function handleDelete(email) {
    setModal(true);
    setEmail(email);
  }

  async function deleteUser(evt) {
    evt.preventDefault();
    try {
      const serverUrl = import.meta.env.VITE_SERVER_URL;
      let response = await fetch(serverUrl + "admin/delete?email=" + email, {
        method: "DELETE",
        credentials: "include",
      });
      response = await response.json();
      console.log(response);
      if (response.ok) {
        setAlert("Se ha eliminado correctamente.");
        window.location.reload();
      } else throw new Error("Ha ocurrido un error al eliminar el blog.");
    } catch (e) {
      setAlert(String(e));
      setTimeout(() => setAlert(null), 3000);
    }
  }

  return (
    <>
      <AdminModal modal={modal} setModal={setModal}>
        <h2 className="text-xl font-bold">¿Deseas eliminar este blog?</h2>
        <div className="mt-3 flex w-full flex-row gap-3">
          <button
            className="w-full rounded-lg border-2 border-red-500 bg-red-500 p-2 
            text-white hover:bg-white hover:font-bold hover:text-red-500"
            onClick={deleteUser}
          >
            Eliminar
          </button>
          <button
            className="w-full rounded-lg border-2 border-black bg-black p-2 
            text-white hover:bg-white hover:font-bold hover:text-black"
            onClick={() => setModal(false)}
          >
            Cancelar
          </button>
        </div>
        {alert && <div className="mt-4 p-2">{alert}</div>}
      </AdminModal>

      <Template footer={false} navbar={false}>
        <h1 className="my-3 text-center text-3xl">Administrar Usuarios</h1>

        <div className="flex flex-col md:flex-row">
          {panel ? (
            <EditUser handler={setPanel} user={userInfo} />
          ) : (
            <RegistryUser />
          )}
          <div className="h-[30rem] w-full overflow-y-auto">
            {users?.map((user) => (
              <div key={user._id} className="flex flex-row gap-2 p-5">
                <div className="w-full">
                  <h3 className="text-xl">{user.name}</h3>
                  <p>{user.email}</p>
                  <p>{user.type}</p>
                </div>
                <button onClick={() => handleEdit(user)}>
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    className="rounded-lg border-2 border-white p-2 text-3xl 
                hover:border-blue-500 hover:text-blue-500"
                  />
                </button>
                <button onClick={() => handleDelete(user.email)}>
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="rounded-lg border-2 border-white p-2 text-3xl 
                  hover:border-red-500 hover:text-red-500"
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </Template>
    </>
  );
}
export default UserPage;
