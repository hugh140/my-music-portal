import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faTiktok } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import NavBar from "./components/NavBar";

import imgPortada from "./assets/portada.png";

function App() {
  return (
    <>
      <main className="container mx-auto">
        <header className="relative mt-5">
          <img className="mx-auto" width={200} src={imgPortada} alt="" />
        </header>
        <hr className="border-2 border-neutral-400" />

        <article className="flex flex-wrap">
          <NavBar>
            {[
              { text: "Inicio", link: "#" },
              { text: "Recientes", link: "#blog" },
              { text: "Mi música", link: "#music" },
              { text: "Live Animations", link: "#" },
              { text: "Contacto", link: "#" },
            ]}
          </NavBar>

          <section className="w-2/4 flex-1">
            <article
              className="border-2 border-t-0 border-neutral-200 p-5 hover:bg-neutral-100"
              id="headline"
            >
              <a href="#">
                <div className="relative">
                  <img
                    className="w-full rounded object-cover"
                    src="https://picsum.photos/1000/500?grayscale"
                    alt=""
                  />
                  <div
                    className="absolute start-1/2 top-0 hidden h-full w-full -translate-x-1/2 bg-black opacity-30 
                  duration-100 md:block"
                    id="black-bg"
                  />
                  <div className="bottom-10 md:absolute md:start-1/2 md:w-11/12 md:-translate-x-1/2 md:text-white">
                    <h2 className="my-3 text-2xl font-bold">
                      Lorem ipsum dolor sit.
                    </h2>
                    <p>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Omnis aspernatur soluta neque nobis iusto quos est sunt
                      autem culpa, rem exercitationem expedita harum nesciunt
                      aliquam? Modi dolor repudiandae excepturi quam!
                    </p>
                  </div>
                </div>
              </a>
            </article>

            <div className="mx-auto h-8 w-4 border-x-4 border-double border-neutral-400" />

            <article className="border-2 border-neutral-200 p-5" id="blog">
              <div className="relative h-12">
                <h2 className="absolute mb-5 text-xl font-semibold">
                  Recientes
                </h2>
                <a
                  className="absolute end-0 text-blue-700 hover:underline"
                  href=""
                >
                  Ver más &raquo;
                </a>
              </div>
              <div className="flex w-full snap-x gap-4 overflow-x-auto">
                {[
                  Array(6).fill(
                    <a
                      href="#"
                      className="mb-4 w-60 shrink-0 snap-start overflow-hidden decoration-blue-700 
                    underline-offset-2 hover:underline"
                    >
                      <img
                        className="aspect-video rounded object-cover"
                        src="https://picsum.photos/1000/500"
                        alt=""
                      />
                      <h3 className="text-md mt-2 font-semibold">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Provident, et?
                      </h3>
                    </a>
                  ),
                ]}
              </div>
            </article>

            <div className="mx-auto h-8 w-4 border-x-4 border-double border-neutral-400" />

            <article className="border-2 border-neutral-200 p-5" id="music">
              <div className="relative h-12">
                <h2 className="absolute mb-5 text-xl font-semibold">
                  Últimos Lanzamientos
                </h2>
                <a
                  className="absolute end-0 text-blue-700 hover:underline"
                  href=""
                >
                  Ver más &raquo;
                </a>
              </div>
              <div
                className="grid grid-cols-none place-content-center gap-4 sm:grid-cols-2 
              xl:grid-cols-3"
              >
                {[
                  Array(3).fill(
                    <a
                      href="#"
                      className="mb-4  w-60 decoration-blue-700 
                    underline-offset-2 hover:underline"
                    >
                      <img
                        className="aspect-video rounded object-cover"
                        src="https://picsum.photos/1000/500"
                        alt=""
                      />
                      <h3 className="text-md mt-2 font-semibold">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Provident, et?
                      </h3>
                    </a>
                  ),
                ]}
              </div>
            </article>

            <div className="mx-auto h-8 w-4 border-x-4 border-double border-neutral-400" />

            <article className="border-2 border-neutral-200 p-5" id="musica">
              <div className="relative h-12">
                <h2 className="absolute mb-5 text-xl font-semibold">
                  Live Animations
                </h2>
                <a
                  className="absolute end-0 text-blue-700 hover:underline"
                  href=""
                >
                  Ver más &raquo;
                </a>
              </div>
              <div
                className="grid grid-cols-none place-content-center gap-4 sm:grid-cols-2 
              xl:grid-cols-3"
              >
                <a
                  href="renacer.html"
                  target="_blank"
                  className="mb-4  w-60 decoration-blue-700 
                    underline-offset-2 hover:underline"
                >
                  <img
                    className="aspect-video rounded object-cover"
                    src="https://picsum.photos/1000/500"
                    alt=""
                  />
                  <h3 className="text-md mt-2 font-semibold">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Provident, et?
                  </h3>
                </a>
                <a
                  href="eter.html"
                  target="_blank"
                  className="mb-4  w-60 decoration-blue-700 
                    underline-offset-2 hover:underline"
                >
                  <img
                    className="aspect-video rounded object-cover"
                    src="https://picsum.photos/1000/500"
                    alt=""
                  />
                  <h3 className="text-md mt-2 font-semibold">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Provident, et?
                  </h3>
                </a>
                <a
                  href="#"
                  target="_blank"
                  className="mb-4 w-60 decoration-blue-700 
                    underline-offset-2 hover:underline"
                >
                  <img
                    className="aspect-video rounded object-cover"
                    src="https://picsum.photos/1000/500"
                    alt=""
                  />
                  <h3 className="text-md mt-2 font-semibold">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Provident, et?
                  </h3>
                </a>
              </div>
            </article>

            <div className="mx-auto h-8 w-4" />
          </section>
        </article>
      </main>
      <footer className="bg-neutral-900">
        <main className="container mx-auto p-10 py-10 text-white">
          <h2 className="mb-5 text-2xl font-bold text-center">Contáctame</h2>
          <section className="grid grid-cols-none md:grid-cols-2">
            <article className="mb-5">
              <h2 className="my-3 text-xl">Redes:</h2>
              <ul>
                <li>
                  <a
                    href="https://www.instagram.com/hug._h/"
                    rel="noreferrer"
                    target="_blank"
                    className="underline-offset-3 decoration-fuchsia-400 
                    hover:text-fuchsia-400 hover:underline"
                  >
                    <FontAwesomeIcon className="me-2" icon={faInstagram} />
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/@hugh._/featured"
                    rel="noreferrer"
                    target="_blank"
                    className="underline-offset-3 decoration-red-400 
                    hover:text-red-400 hover:underline"
                  >
                    <FontAwesomeIcon className="me-2" icon={faYoutube} />
                    YouTube
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.tiktok.com/@hug._h"
                    rel="noreferrer"
                    target="_blank"
                    className="underline-offset-3 decoration-purple-400 
                    hover:text-purple-400 hover:underline"
                  >
                    <FontAwesomeIcon className="me-2" icon={faTiktok} />
                    TikTok
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/hugh140"
                    rel="noreferrer"
                    target="_blank"
                    className="underline-offset-3 decoration-blue-400 
                    hover:text-blue-400 hover:underline"
                  >
                    <FontAwesomeIcon className="me-2" icon={faGithub} />
                    GitHub
                  </a>
                </li>
              </ul>
            </article>
            <article className="mb-5">
              <h2 className="my-3 text-xl">Correo:</h2>
              <form>
                <label className="mb-1 block" htmlFor="nombre">
                  Nombre:
                </label>
                <input
                  className="w-full rounded-md border-2 border-neutral-800 px-2 py-1 text-black"
                  type="text"
                  name="nombre"
                  id="nombre"
                  required
                />
                <label className="my-1 block" htmlFor="correo">
                  Correo electrónico:
                </label>
                <input
                  className="w-full rounded-md border-2 border-neutral-800 px-2 py-1 text-black"
                  type="email"
                  name="correo"
                  id="correo"
                  required
                />
                <label className="my-1 block" htmlFor="contenido">
                  Contenido:
                </label>
                <textarea
                  className="w-full rounded-md border-2 border-neutral-800 px-2 py-1 text-black"
                  name="contenido"
                  id="contenido"
                  cols="30"
                  rows="5"
                  required
                ></textarea>
                <button className="bg-neutral-800 mt-1 rounded-md w-full md:w-auto p-3" type="submit">Enviar</button>
              </form>
            </article>
          </section>
        </main>
      </footer>
    </>
  );
}

export default App;
