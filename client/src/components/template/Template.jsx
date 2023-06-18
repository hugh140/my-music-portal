import PropTypes from "prop-types";

import NavBar from "./NavBar";
import Footer from "./Footer";

import imgPortada from "../../assets/portada.png";

function Template({ children }) {
  return (
    <>
      <main className="container mx-auto">
        <header className="relative mt-5">
          <img className="mx-auto" width={200} src={imgPortada} alt="" />
        </header>
        <hr className="border-2 border-neutral-400" />

        <article className="flex flex-wrap">
          <NavBar />
          <section className="w-2/4 flex-1">{children}</section>
        </article>
      </main>
      <Footer />
    </>
  );
}
export default Template;

Template.propTypes = {
  children: PropTypes.element,
};
