import NavBar from "./components/NavBar";

import imgPortada from "./assets/portada.png";

function App() {
  return (
    <main className="container mx-auto mt-10">
      <h1
        className="text-5xl tracking-wide font-bold text-neutral-900 text-center"
        id="artist-name"
      >
        Hugo Reyes
      </h1>
      <img className="mx-auto mt-5" src={imgPortada} alt="" />
      <hr className="border-neutral-400 border-2" />

      <article className="flex flex-wrap gap-2">
        <NavBar options={["Opción #2", "Opción #3", "Opción #1"]} />
        <section className="md:w-auto flex-1">Content</section>
      </article>

      <div className="grid place-content-center h-screen">
        <a href="renacer.html">
          <button className="border-2 p-2">#1</button>
        </a>
        <a href="eter.html">
          <button className="border-2 p-2">#2</button>
        </a>
      </div>
    </main>
  );
}

export default App;
