import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import Template from "../../components/template/Template";
import useSoftware from "../../hooks/software";

function GeneralPages() {
  const webPages = useSoftware();

  return (
    <Template footerInfo={false}>
      {!webPages.length ? (
        <div className="h-screen">
          <div className="flex h-full place-content-center place-items-center text-9xl">
            <FontAwesomeIcon icon={faSpinner} spin={true} />
          </div>
        </div>
      ) : (
        <main className="h-full">
          <section className="flex flex-wrap place-content-center gap-3 p-5 md:place-content-start">
            {webPages?.map((page) => (
              <a
                key={page.title}
                href={page.url}
                className="mb-4 rounded-lg border-2 border-zinc-100 
                p-2 decoration-blue-700 underline-offset-2 hover:underline md:w-64 lg:w-72"
              >
                <img
                  className="aspect-square rounded object-cover"
                  src={page.img}
                  alt=""
                />
                <h3 className="text-md mt-2 font-semibold">{page.title}</h3>
              </a>
            ))}
          </section>
        </main>
      )}
    </Template>
  );
}
export default GeneralPages;
