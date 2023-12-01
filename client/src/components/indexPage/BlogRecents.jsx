import PropTypes from "prop-types";

function BlogRecents({ blogs }) {
  return (
    <>
      {blogs.lenght && (
        <article className="border-2 border-neutral-200 p-5" id="blog">
          <div className="relative h-12">
            <h2 className="absolute mb-5 text-xl font-semibold">Recientes</h2>
            <a
              className="absolute end-0 text-blue-700 hover:underline"
              href="/general/blogs"
            >
              Ver más &raquo;
            </a>
          </div>
          <div className="flex w-full snap-x gap-4 overflow-x-auto">
            {blogs?.map((blog) => (
              <a
                key={blog._id}
                href={`/blog/${blog._id}`}
                className="mb-4 w-60 shrink-0 snap-start overflow-hidden decoration-blue-700 
            underline-offset-2 hover:underline"
              >
                <img
                  className="aspect-video rounded object-cover"
                  src={blog.headerImg}
                  alt={blog.title}
                />
                <h3 className="text-md mt-2 font-semibold">{blog.title}</h3>
              </a>
            ))}
          </div>
        </article>
      )}
    </>
  );
}
export default BlogRecents;

BlogRecents.propTypes = {
  blogs: PropTypes.array,
};
