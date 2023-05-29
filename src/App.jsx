import NavBar from "./template/NavBar";
import Footer from "./template/Footer";
import Headline from "./components/Headline";
import BlogRecents from "./components/BlogRecents";
import MusicRecents from "./components/MusicRecents";
import LiveAnimations from "./components/LiveAnimations";

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
            <Headline />

            <div className="mx-auto h-8 w-4 border-x-4 border-double border-neutral-400" />

            <BlogRecents />

            <div className="mx-auto h-8 w-4 border-x-4 border-double border-neutral-400" />

            <MusicRecents />

            <div className="mx-auto h-8 w-4 border-x-4 border-double border-neutral-400" />

            <LiveAnimations />

            <div className="mx-auto h-8 w-4" />
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}

export default App;
