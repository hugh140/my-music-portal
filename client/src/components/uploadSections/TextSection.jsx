import { useContext, useEffect, useState } from "react";
import { ElementsContext } from "../../pages/upload/BlogUpload";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function TextSection({ index }) {
  const elements = useContext(ElementsContext);
  const [realIndex, setRealIndex] = useState(index);
  console.log(realIndex);

  function deleteSection(ev) {
    ev.preventDefault();
    console.log(realIndex);
    const el = [...elements.elements];
    el.splice(realIndex, 1);
    elements.setElements(el);
    elements.setLastDeleted(realIndex);
  }

  useEffect(() => {
    if (realIndex > elements.lastDeleted) setRealIndex(realIndex - 1);
  }, [elements.lastDeleted, realIndex]);

  return (
    <main key={index}>
      <hr className="mb-5 mt-10 border-black" />
      <button onClick={deleteSection}>
        <FontAwesomeIcon
          icon={faTrash}
          className="rounded border-2 border-red-700 p-2 text-red-500 hover:bg-red-500 
            hover:text-white"
        />
      </button>
      <label htmlFor="section" className="ms-4 text-xl font-bold">
        Texto
      </label>
      <br />
      <textarea
        id="section"
        rows="5"
        placeholder={realIndex}
        className="mt-5 w-full border-2 p-2"
      />
    </main>
  );
}
export default TextSection;

TextSection.propTypes = {
  index: PropTypes.number,
  elements: PropTypes.array,
  setElements: PropTypes.func,
};
