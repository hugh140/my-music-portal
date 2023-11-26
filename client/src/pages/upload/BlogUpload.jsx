import { useState, useEffect, createContext } from "react";

import Template from "../../components/template/template";
import Sections from "../../components/uploadSections/Sections";
import { ImgSection } from "../../components/uploadSections/InputSections";
import OptionsBar from "../../components/uploadSections/optionsBar";

import jsonPostBuilder from "../../scripts/jsonPostBuilder";
import { useNavigate } from "react-router-dom";

const ElementsContext = createContext();

function BlogUpload() {
  const [elements, setElements] = useState([]);
  const [lastDeleted, setLastDeleted] = useState(Infinity);
  const navigate = useNavigate();

  useEffect(() => {
    if (!document.cookie) navigate("/login?redirect=/adminPanel/upload/blog");
  }, [navigate]);

  function addSection(type, index) {
    const el = [...elements];
    el.splice(
      index,
      0,
      <Sections key={Date.now()} index={elements.length} type={type} />
    );
    setElements(el);
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    const buildedJson = await jsonPostBuilder(evt);
    let postConfirm = await fetch("http://localhost:3000/api/blog", {
      method: "POST",
      body: buildedJson,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    postConfirm = await postConfirm.text();
    console.log(postConfirm);
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
            className="mb-4 ms-4 w-[80%] rounded-md border-2 border-zinc-100 p-2"
          />
          <br />
          <label className="mb-5 text-xl font-bold">Portada:</label>
          <br />
          <ImgSection name="header" />

          <ElementsContext.Provider
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
          </ElementsContext.Provider>

          <div className="h-2">
            <OptionsBar addSection={addSection} index={elements.length} />
          </div>

          <br />

          <div className="mb-40 flex flex-row-reverse">
            <input
              type="submit"
              value="Subir Blog"
              className="my-4 rounded-md border-2 border-zinc-500 p-2 hover:bg-zinc-500 
            hover:text-white active:bg-white active:text-black"
            />
          </div>
        </form>
      </main>
    </Template>
  );
}
export { BlogUpload, ElementsContext };
