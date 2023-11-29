import PropTypes from "prop-types";

function MusicRecents({ releases }) {
  return (
    <article className="border-2 border-neutral-200 p-5" id="music">
      <div className="relative h-12">
        <h2 className="absolute mb-5 text-xl font-semibold">
          Últimos Lanzamientos
        </h2>
        <a
          className="absolute end-0 text-blue-700 hover:underline"
          href="/general/music"
        >
          Ver más &raquo;
        </a>
      </div>
      <div
        className="grid grid-cols-none place-content-center gap-4 sm:grid-cols-2 
              xl:grid-cols-3"
      >
        {releases?.map((release) => (
          <a
            key={release.name}
            href={`/music/${release.id}`}
            className="mb-4 w-60 decoration-blue-700 
            underline-offset-2 hover:underline"
          >
            <img
              className="aspect-square rounded object-cover"
              src={release.cover}
              alt={release.name}
            />
            <h3 className="mt-2 text-lg font-semibold">{release.name}</h3>
            <p className="text-sm">Por: {release.artistName}</p>
          </a>
        ))}
      </div>
    </article>
  );
}
export default MusicRecents;

MusicRecents.propTypes = {
  releases: PropTypes.array,
};
