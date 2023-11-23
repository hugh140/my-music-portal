import { useState } from "react";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-solid-svg-icons";

function OptionsBar({ addSection, index }) {
  const [buttonPressed, setButtonPressed] = useState(false);
  const handleButton = () => setButtonPressed(!buttonPressed);

  function buttonSection(type) {
    addSection(type, index);
    setButtonPressed(false);
  }

  return (
    <div className="relative">
      <hr className="my-10 border-zinc-400" />
      <div className="absolute -top-5 left-10 w-full">
        <button onClick={handleButton} type="button">
          <FontAwesomeIcon
            icon={faPlus}
            className={`rounded-full border-2 border-black bg-white p-2 text-2xl
            duration-75 ease-out hover:bg-black hover:text-white ${
              buttonPressed ? "rotate-option" : null
            }`}
          />
        </button>
      </div>
      <div className="absolute -top-4 left-24">
        <button onClick={() => buttonSection("Texto")} type="button">
          <FontAwesomeIcon
            icon={faFileLines}
            style={{ display: buttonPressed ? "block" : "none" }}
            className="text-md rounded-full border-2 border-black bg-white p-2
         hover:bg-black hover:text-white"
          />
        </button>
      </div>
      <div className="absolute -top-4 left-36">
        <button onClick={() => buttonSection("Imagen")} type="button">
          <FontAwesomeIcon
            icon={faImage}
            style={{ display: buttonPressed ? "block" : "none" }}
            className="text-md rounded-full border-2 border-black bg-white p-2
          hover:bg-black hover:text-white"
          />
        </button>
      </div>
    </div>
  );
}
export default OptionsBar;

OptionsBar.propTypes = {
  addSection: PropTypes.func,
  index: PropTypes.number,
};
