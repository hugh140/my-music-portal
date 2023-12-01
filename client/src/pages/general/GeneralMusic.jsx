import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import Template from "../../components/template/template";
import useMusic from "../../hooks/music";

function GeneralMusic() {
  const music = useMusic(50);

  return (
    <Template footerInfo={false}>
      {!music.length ? (
        <div className="h-screen">
          <div className="flex h-full place-content-center place-items-center text-9xl">
            <FontAwesomeIcon icon={faSpinner} spin={true} />
          </div>
        </div>
      ) : (
        <main className="h-full">
          <section className="flex flex-wrap place-content-center gap-3 p-5 md:place-content-start">
            {music?.map((header) => (
              <a
                key={header.id}
                href={`/music/${header.id}`}
                className="mb-4 rounded-lg border-2 border-zinc-100 
                p-2 decoration-blue-700 underline-offset-2 hover:underline md:w-64 lg:w-72"
              >
                <img
                  className="aspect-square rounded object-cover"
                  src={header.cover}
                  alt=""
                />
                <h3 className="text-md mt-2 font-semibold">{header.name}</h3>
                <p className="text-sm">Por: {header.artistName}</p>
              </a>
            ))}
          </section>
        </main>
      )}
    </Template>
  );
}
export default GeneralMusic;
