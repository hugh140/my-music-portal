import { useContext, useEffect, useState } from "react";
import { ElementsContext } from "../../pages/upload/BlogUpload";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { TextSection, ImgSection } from "./InputSections";

function Sections({ index, type }) {
  const context = useContext(ElementsContext);
  const [realIndex, setRealIndex] = useState(index);
  const [sectionContent] = useState(() => {
    switch (type) {
      case "Texto":
        return <TextSection />;
      case "Imagen":
        return <ImgSection name="img" />;
    }
  });

  function deleteSection(ev) {
    ev.preventDefault();
    const el = [...context.elements];
    el.splice(realIndex, 1);
    context.setElements(el);
    context.setLastDeleted(realIndex);
  }

  useEffect(() => {
    if (realIndex > context.lastDeleted) setRealIndex(realIndex - 1);
  }, [context.lastDeleted, realIndex]);

  return (
    <main key={index} className="mt-8">
      <button onClick={deleteSection}>
        <FontAwesomeIcon
          icon={faTrash}
          className="rounded border-2 border-red-700 p-2 text-red-500 hover:bg-red-500 
            hover:text-white"
        />
      </button>
      <label htmlFor="section" className="ms-4 text-xl font-bold">
        {type}:
      </label>
      <br />
      {sectionContent}
    </main>
  );
}
export default Sections;

Sections.propTypes = {
  index: PropTypes.number,
  type: PropTypes.string,
};
