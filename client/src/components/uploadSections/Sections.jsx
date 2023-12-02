import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { TextSection, ImgSection } from "./InputSections";

function Sections({ index, type, contextType, value }) {
  const context = useContext(contextType);
  const [realIndex, setRealIndex] = useState(index);
  const [sectionContent] = useState(() => {
    switch (type) {
      case "Texto":
        return <TextSection value={value} />;
      case "Imagen":
        return <ImgSection value={value} name="img" index={index} />;
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
  }, [context, realIndex]);

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
  contextType: PropTypes.any,
  value: PropTypes.string,
};

Sections.defaultProps = {
  value: null,
};
