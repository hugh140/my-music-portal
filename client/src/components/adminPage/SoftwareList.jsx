import PropTypes from "prop-types";
import useSoftware from "../../hooks/software"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

function SoftwareList({ handleDelete }) {
  const webPages = useSoftware();
  return (
    <>
      {webPages.length ? (
        webPages?.map((page) => (
          <div
            key={page.title}
            className="relative mb-4 rounded-lg border-2 border-zinc-100
            p-2 md:w-64 lg:w-72"
            id="hoverOptions"
          >
            <div
              className="absolute left-1/2 top-1/2 hidden h-full w-full -translate-x-1/2 
          -translate-y-1/2 rounded-lg bg-black bg-opacity-30"
              id="blogOptions"
            >
              <div className="flex h-full place-content-center place-items-center gap-3">
                <a
                  className="rounded bg-white p-4 hover:bg-zinc-200 
              active:bg-zinc-400"
                  href={page.url}
                >
                  <FontAwesomeIcon icon={faEye} />
                </a>
                <a
                  className="rounded bg-green-500 p-4 text-white hover:bg-green-600 
              hover:text-white active:bg-green-800"
                  href={`/adminPanel/edit/page/${page._id}`}
                >
                  <FontAwesomeIcon icon={faArrowUp} />
                </a>
                <button
                  className="rounded bg-red-500 p-4 text-white hover:bg-red-600 
              hover:text-white active:bg-red-800"
                  onClick={() => handleDelete(page.title)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
            <img
              className="aspect-video rounded object-cover"
              src={page.img}
            />
            <h3 className="text-md mt-2 font-semibold">{page.title}</h3>
          </div>
        ))
      ) : (
        <div className="flex h-60 place-items-center">
          <div className="text-2xl text-center">Aún no existen aplicaciones web.</div>
        </div>
      )}
    </>
  );
}
export default SoftwareList;

SoftwareList.propTypes = {
  handleDelete: PropTypes.func,
};
