import PropTypes from "prop-types";
import useHeaders from "../../hooks/headers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

function BlogList({ handleDelete }) {
  const blogs = useHeaders(0, 4);
  return (
    <>
      {blogs === null ? (
        blogs?.map((blog) => (
          <div
            key={blog._id}
            href={`/blog/${blog._id}`}
            className="relative mb-4 rounded-lg border-2 border-zinc-100
        p-2 md:w-64 lg:w-72"
            id="hoverOptions"
          >
            <div
              className="absolute left-1/2 top-1/2 hidden h-full w-full -translate-x-1/2 
          -translate-y-1/2 rounded-lg bg-black bg-opacity-50"
              id="blogOptions"
            >
              <div className="flex h-full place-content-center place-items-center gap-3">
                <a
                  className="rounded bg-white p-4 hover:bg-zinc-200 
              active:bg-zinc-400"
                  href={`/blog/${blog._id}`}
                >
                  <FontAwesomeIcon icon={faEye} />
                </a>
                <a
                  className="rounded bg-blue-500 p-4 text-white hover:bg-blue-600 
              hover:text-white active:bg-blue-800"
                  href={`/adminPanel/edit/blog/${blog._id}`}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </a>
                <button
                  className="rounded bg-red-500 p-4 text-white hover:bg-red-600 
              hover:text-white active:bg-red-800"
                  onClick={() => handleDelete(blog._id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
            <img
              className="aspect-video rounded object-cover"
              src={blog.headerImg}
            />
            <h3 className="text-md mt-2 font-semibold">{blog.title}</h3>
          </div>
        ))
      ) : (
        <div className="flex h-60 place-items-center">
          <div className="text-2xl text-center">Aún no existen blogs.</div>
        </div>
      )}
    </>
  );
}
export default BlogList;

BlogList.propTypes = {
  handleDelete: PropTypes.func,
};
