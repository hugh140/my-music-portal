import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function AdminModal({ setModal, modal, children }) {
  return (
    <div
      className="fixed top-0 z-10 h-full w-full bg-black bg-opacity-30"
      style={{ display: modal ? "block" : "none" }}
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
          {children}
        </div>
      </div>
    </div>
  );
}
export default AdminModal;

AdminModal.propTypes = {
  modal: PropTypes.bool,
  setModal: PropTypes.func,
  children: PropTypes.any,
};
