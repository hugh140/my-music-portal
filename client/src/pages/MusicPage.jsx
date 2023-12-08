import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import Template from "../components/template/Template";
import { useParams } from "react-router-dom";
import useRelease from "../hooks/release";

function MusicPage() {
  const { id } = useParams();
  const release = useRelease(id);

  return (
    <Template footerInfo={false}>
      <section className="p-5 sm:px-10">
        <h1 className="text-center text-3xl font-bold">{release?.name}</h1>
        <p className="text-center text-xl">
          Por:&nbsp;
          <a
            href={release.artist?.url}
            className="font-bold text-lime-700 decoration-lime-700 hover:underline"
          >
            {release.artist?.name}
          </a>
        </p>
        <p className="text-center">{release?.release_date}</p>
        <div className="flex place-content-center">
          <a href={release?.url}>
            <img
              className="mb-5 mt-2 aspect-square w-96 rounded object-cover"
              src={release?.cover}
              alt=""
            />
          </a>
        </div>
        <div className="text-center">
          Escúchalo ahorita en&nbsp;
          <a
            href={release?.url}
            className="font-bold text-lime-700 decoration-green-700 hover:underline"
          >
            Spotify&nbsp;
            <FontAwesomeIcon icon={faSpotify} />
          </a>
        </div>
        <br />
        <hr />
        <br />
        <div className="text-center">O ten una escucha preliminar.</div>
        <br />

        <div className="flex place-content-center">
          {release?.id && (
            <iframe
              src={`https://open.spotify.com/embed/album/${release?.id}?utm_source=generator`}
              className="w-96"
              height="352"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          )}
        </div>
      </section>
    </Template>
  );
}
export default MusicPage;
