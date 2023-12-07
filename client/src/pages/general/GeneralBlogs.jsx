import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

import Template from "../../components/template/template";
import useHeaders from "../../hooks/headers";

const numBlogs = 10;

function GeneralBlogs() {
  const [intervalBlogs, setintervalBlogs] = useState(numBlogs);
  const headers = useHeaders(intervalBlogs - numBlogs, intervalBlogs);

  return (
    <Template footerInfo={false}>
      <main className="h-full">
        <section className="flex flex-wrap place-content-center gap-3 p-5 md:place-content-start">
          {headers?.map((header) => (
            <a
              key={header._id}
              href={`/blog/${header._id}`}
              className="mb-4 rounded-lg border-2 border-zinc-100 
              p-2 decoration-blue-700 underline-offset-2 hover:underline md:w-64 lg:w-72"
            >
              <img
                className="aspect-video rounded object-cover"
                src={header.headerImg}
                alt=""
              />
              <h3 className="text-md mt-2 font-semibold">{header.title}</h3>
            </a>
          ))}
        </section>
        <div className="flex place-content-center">
          <button
            onClick={() => setintervalBlogs(intervalBlogs + numBlogs)}
            className="hover:underline"
          >
            Cargar más blogs <br />
            <FontAwesomeIcon
              className="mb-5 rounded-full border-2 bg-black p-1 px-2 text-2xl text-white"
              icon={faCaretDown}
              flip={true}
            />
          </button>
        </div>
      </main>
    </Template>
  );
}
export default GeneralBlogs;
