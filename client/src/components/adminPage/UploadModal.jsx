import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const buttonOptions = [
  { name: "Blog", link: "/adminPanel/upload/blog" },
  { name: "Software", link: "/" },
];

function UploadModal({ setModal, modal }) {
  return (
    <div
      className="fixed top-0 z-10 h-full w-full bg-black bg-opacity-30"
      style={{ display: modal ? "block" : "none" }}
      onClick={() => setModal(false)}
    >
      <div className="flex h-full place-content-center place-items-center">
        <div className="rounded-lg border-2 border-black bg-white p-5">
          <div
            className="flex cursor-pointer justify-end 
        text-xl hover:text-red-600"
            onClick={() => setModal(false)}
          >
            <FontAwesomeIcon icon={faXmark} />
          </div>
          <h2 className="text-xl font-bold">¿Qué deseas subir?</h2>
          {buttonOptions.map((option) => (
            <Link key={option.name} to={option.link}>
              <button
                className="mt-2 w-full rounded border-2 p-2 hover:border-black 
            hover:bg-black hover:text-white"
              >
                {option.name}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
export default UploadModal;

UploadModal.propTypes = {
  modal: PropTypes.bool,
  setModal: PropTypes.func,
};
