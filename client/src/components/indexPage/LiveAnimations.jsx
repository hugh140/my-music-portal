import PropTypes from "prop-types";

function LiveAnimations({ webPages }) {
  return (
    <article className="border-2 border-neutral-200 p-5" id="musica">
      <div className="relative h-12">
        <h2 className="absolute mb-5 text-xl font-semibold">Software</h2>
        <a
          className="absolute end-0 text-blue-700 hover:underline"
          href="/general/software"
        >
          Ver más &raquo;
        </a>
      </div>
      <div
        className="grid grid-cols-none place-content-center gap-4 sm:grid-cols-2 
        xl:grid-cols-3"
      >
        {webPages?.map((page) => (
          <a
            key={page.title}
            href={page.url}
            className="mb-4 w-60 shrink-0 snap-start overflow-hidden decoration-blue-700 
            underline-offset-2 hover:underline"
          >
            <img
              className="aspect-video rounded object-cover"
              src={page.img}
              alt={page.title}
            />
            <h3 className="text-md mt-2 font-semibold">{page.title}</h3>
          </a>
        ))}
      </div>
    </article>
  );
}
export default LiveAnimations;

LiveAnimations.propTypes = {
  webPages: PropTypes.array,
};
