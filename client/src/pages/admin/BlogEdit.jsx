import { useState, useEffect, createContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import Template from "../../components/template/Template";
import Sections from "../../components/uploadSections/Sections";
import { ImgSection } from "../../components/uploadSections/InputSections";
import OptionsBar from "../../components/uploadSections/OptionsBar";
import useSession from "../../hooks/session";

import jsonPostBuilder from "../../scripts/jsonPostBuilder";
import useBlog from "../../hooks/blog";
import { useParams } from "react-router-dom";

const EditContext = createContext();

function BlogEdit() {
  const [elements, setElements] = useState([]);
  const [lastDeleted, setLastDeleted] = useState(Infinity);
  const [alert, setAlert] = useState({ render: false, ok: false });
  const [loader, setLoader] = useState(false);

  const { id } = useParams();
  const blog = useBlog(id);

  useSession(`/login?redirect=/adminPanel/edit/blog/${id}`);

  useEffect(() => {
    if (!blog.blogContent) return;
    const el = [];
    for (const content of blog.blogContent) {
      if (content.type === "image")
        el.push(
          <Sections
            key={content.content}
            index={el.length}
            type="Imagen"
            contextType={EditContext}
            value={content.content}
          />
        );
      else if (content.type === "paragraph")
        el.push(
          <Sections
            key={content.content}
            index={el.length}
            type="Texto"
            contextType={EditContext}
            value={content.content}
          />
        );
    }
    setElements(el);
  }, [blog.blogContent]);

  function addSection(type, index) {
    const el = [...elements];
    el.splice(
      index,
      0,
      <Sections
        key={Date.now()}
        index={elements.length}
        type={type}
        contextType={EditContext}
      />
    );
    setElements(el);
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    setLoader(true);
    try {
      const serverUrl = import.meta.env.VITE_SERVER_URL;
      const buildedJson = await jsonPostBuilder(evt);
      let response = await fetch(serverUrl + "api/blog/" + id, {
        method: "PUT",
        body: buildedJson,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      response = await response.json();
      setLoader(false);
      if (response.ok === true) {
        setAlert({ render: true, ok: true });
        window.location.href = "/adminPanel";
      } else throw response.message;
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
            defaultValue={blog?.title}
            className="mb-4 ms-4 w-[80%] rounded-md border-2 border-zinc-100 p-2"
            required
          />
          <br />
          <label className="mb-5 text-xl font-bold">Portada:</label>
          <br />
          <ImgSection name="header" value={blog?.headerImg} />

          <EditContext.Provider
            value={{ elements, setElements, lastDeleted, setLastDeleted }}
          >
            {elements.map((section, index) => (
              <div key={section.key}>
                <div className="h-2">
                  <OptionsBar addSection={addSection} index={index} />
                </div>
                {section}
              </div>
            ))}
          </EditContext.Provider>

          <div className="h-2">
            <OptionsBar addSection={addSection} index={elements.length} />
          </div>

          <br />

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
                "Editar Blog"
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
            {alert.ok ? "El blog se ha subido correctamente." : alert.message}
          </div>
        )}
      </main>
    </Template>
  );
}
export { BlogEdit };
