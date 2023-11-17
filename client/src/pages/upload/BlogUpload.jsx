import { useState, createContext } from "react";
import Template from "../../components/template/template";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-solid-svg-icons";

import TextSection from "../../components/uploadSections/TextSection";

const ElementsContext = createContext();

function BlogUpload() {
  const [elements, setElements] = useState([]);
  const [buttonPressed, setButtonPressed] = useState(false);
  const [lastDeleted, setLastDeleted] = useState(Infinity);

  const handleButton = () => setButtonPressed(!buttonPressed);

  function addTextSection() {
    const el = [...elements];
    el.push(<TextSection key={elements.length} index={elements.length} />);
    setElements(el);
    setButtonPressed(false);
  }

  return (
    <Template footer={false} navbar={false}>
      <main className="mx-auto w-[90%]">
        <form className="mt-5">
          <label htmlFor="title" className="text-xl font-bold">
            Título:
          </label>
          <input
            type="text"
            id="title"
            rows={1}
            placeholder="Escribe el título de tu blog."
            className="mb-4 ms-4 w-[80%] rounded border-2 border-zinc-400 px-2"
          />
          <br />
          <input type="file" src="" alt="" />

          <ElementsContext.Provider
            value={{ elements, setElements, lastDeleted, setLastDeleted }}
          >
            {elements.map((section) => section)}
          </ElementsContext.Provider>
        </form>

        <div className="relative mb-52">
          <hr className="my-10 border-black" />
          <div className="absolute -top-5 left-10 w-full">
            <button onClick={handleButton}>
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
            <button onClick={addTextSection}>
              <FontAwesomeIcon
                icon={faFileLines}
                style={{ opacity: buttonPressed ? 1 : 0 }}
                className="rounded-full border-2 border-black bg-white p-2 text-lg
                  duration-75 ease-out hover:bg-black hover:text-white"
              />
            </button>
          </div>
          <div className="absolute left-20 top-6 w-full">
            <button>
              <FontAwesomeIcon
                icon={faImage}
                style={{ opacity: buttonPressed ? 1 : 0 }}
                className="rounded-full border-2 border-black bg-white p-2 text-lg
                  hover:bg-black hover:text-white"
              />
            </button>
          </div>
        </div>
      </main>
    </Template>
  );
}
export { BlogUpload, ElementsContext };
