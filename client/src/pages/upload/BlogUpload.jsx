import { useState, createContext } from "react";
import Template from "../../components/template/template";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-solid-svg-icons";

import Sections from "../../components/uploadSections/Sections";
import jsonPostBuilder from "../../scripts/jsonPostBuilder";
import { ImgSection } from "../../components/uploadSections/InputSections";

const ElementsContext = createContext();

function BlogUpload() {
  const [elements, setElements] = useState([]);
  const [buttonPressed, setButtonPressed] = useState(false);
  const [lastDeleted, setLastDeleted] = useState(Infinity);

  const handleButton = () => setButtonPressed(!buttonPressed);

  function addSection(type) {
    const el = [...elements];
    el.push(
      <Sections key={elements.length} index={elements.length} type={type} />
    );
    setElements(el);
    setButtonPressed(false);
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    const buildedJson = await jsonPostBuilder(evt);
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
            className="mb-4 ms-4 w-[80%] rounded-md border-2 border-zinc-100 px-2"
          />
          <br />
          <label className="mb-5 text-xl font-bold">Portada:</label>
          <br />
          <ImgSection name="header" />

          <ElementsContext.Provider
            value={{ elements, setElements, lastDeleted, setLastDeleted }}
          >
            {elements.map((section) => section)}
          </ElementsContext.Provider>
          <br />

          <div className="relative">
            <hr className="my-10 border-zinc-400" />
            <div className="absolute -top-5 left-10 w-full">
              <button onClick={handleButton} type="button">
                <FontAwesomeIcon
                  icon={faPlus}
                  className={`rounded-full border-2 border-black bg-white p-2 text-lg
                  duration-75 ease-out hover:bg-black hover:text-white ${
                    buttonPressed ? "rotate-option" : null
                  }`}
                />
              </button>
            </div>
            <div className="absolute left-0 top-6 w-full">
              <button onClick={() => addSection("Texto")} type="button">
                <FontAwesomeIcon
                  icon={faFileLines}
                  style={{ opacity: buttonPressed ? 1 : 0 }}
                  className="rounded-full border-2 border-black bg-white p-2 text-lg
                  duration-75 ease-out hover:bg-black hover:text-white"
                />
              </button>
            </div>
            <div className="absolute left-20 top-6 w-full">
              <button onClick={() => addSection("Imagen")} type="button">
                <FontAwesomeIcon
                  icon={faImage}
                  style={{ opacity: buttonPressed ? 1 : 0 }}
                  className="rounded-full border-2 border-black bg-white p-2 text-lg
                  hover:bg-black hover:text-white"
                />
              </button>
            </div>
          </div>

          <div className="mb-40 flex flex-row-reverse">
            <input
              type="submit"
              value="Subir Blog"
              className="my-4 rounded-md border-2 border-zinc-700 p-2 hover:bg-zinc-700 
            hover:text-white active:bg-white active:text-black"
            />
          </div>
        </form>
      </main>
    </Template>
  );
}
export { BlogUpload, ElementsContext };
