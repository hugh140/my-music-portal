import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Template from "../../components/template/Template";
import fileAsciiTree from "../../scripts/fileAsciiTree";
import { useParams } from "react-router-dom";

import {
  faSpinner,
  faUpload,
  faXmark,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

function SoftwareEdit() {
  const [files, setFiles] = useState();
  const [alert, setAlert] = useState({ render: false, ok: false });
  const [loader, setLoader] = useState(false);
  const [asciiDir, setAsciiDir] = useState("");
  const { name } = useParams();
  const navigate = useNavigate();

  const { getRootProps, getInputProps } = useDropzone({
    multiple: true,
    onDrop: async (res) => {
      setLoader(true);
      setFiles(res);
      const asciiTree = await fileAsciiTree(res);
      setAsciiDir(asciiTree);
      setLoader(false);
    },
  });

  useEffect(() => {
    if (!document.cookie)
      navigate(`/login?redirect=/adminPanel/edit/software/${name}`);
  }, [navigate, name]);

  async function handleSubmit(evt) {
    evt.preventDefault();
    setLoader(true);
    try {
      const fileData = new FormData();
      for (const file of files) {
        fileData.append("pageFiles", new File([file], file.path));
      }
      const formData = new FormData(evt.target);

      const serverUrl = import.meta.env.VITE_SERVER_URL;
      let response = await fetch(
        `${serverUrl}software/update/${name}?name=${formData.get("title")}`,
        {
          method: "PUT",
          body: fileData,
          credentials: "include",
        }
      );
      response = await response.json();
      if (response.ok === true) {
        setAlert({ render: true, ok: true });
        window.location.href = "/adminPanel";
      } else throw response.message;
      setLoader(false);
    } catch (e) {
      setAlert({ render: true, ok: false, message: e });
      setLoader(false);
      setTimeout(() => {
        setAlert({ render: false, ok: false });
      }, 3000);
    }
  }

  return (
    <Template footer={false} navbar={false}>
      <main className="mx-auto w-[90%]">
        <form className="mt-5" onSubmit={handleSubmit}>
          <label htmlFor="title" className="text-xl font-bold">
            Título:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            rows={1}
            placeholder="Escribe el título de tu blog."
            className="mb-4 w-full rounded-md border-2 border-zinc-100 p-2"
            defaultValue={name}
            required
          />
          <br />
          <label htmlFor="version" className="text-lg font-bold">
            Archivos:
          </label>
          <br />

          <div className="flex flex-col gap-5 md:flex-row">
            <div
              {...getRootProps()}
              className="h-50 my-4 flex w-full cursor-pointer rounded-md border-2
              border-dashed hover:border-zinc-400 md:w-1/2"
              style={{ minHeight: "10rem", minWidth: "10rem" }}
            >
              <input {...getInputProps()} />
              <div>
                <p className="w-full p-10 text-center">
                  Selecciona o dropea el directorio que contiene la página web.
                  <br />
                  <FontAwesomeIcon
                    className="mt-8 text-5xl"
                    icon={faUpload}
                    beat={true}
                  />
                </p>
              </div>
            </div>
            <div className="relative w-full">
              <textarea
                className="my-4 line-clamp-3 w-full resize-none overflow-y-auto 
                rounded-md border-2 border-dotted bg-white p-3 font-mono
                text-gray-500"
                cols={30}
                rows={15}
                disabled={true}
                placeholder="Visualizador para el contenido a subir."
                value={asciiDir}
              ></textarea>
            </div>
          </div>

          <div className="mb-40 flex flex-row-reverse">
            <button
              type="submit"
              className="my-4 rounded-md border-2 border-zinc-500 p-2 hover:bg-zinc-500 
            hover:text-white active:bg-white active:text-black"
              disabled={loader}
            >
              {loader ? (
                <FontAwesomeIcon
                  icon={faSpinner}
                  spin={true}
                  className="px-7"
                />
              ) : (
                "Actualizar App"
              )}
            </button>
          </div>
        </form>
        {alert.render && (
          <div
            className="fixed right-5 top-5 rounded-lg border-2 border-black bg-white 
            p-2 text-black"
          >
            <FontAwesomeIcon icon={alert.ok ? faCheck : faXmark} />
            &nbsp;
            {alert.ok
              ? "La página se ha actualizado correctamente."
              : alert.message}
          </div>
        )}
      </main>
    </Template>
  );
}
export default SoftwareEdit;
