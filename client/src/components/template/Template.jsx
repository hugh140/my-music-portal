import PropTypes from "prop-types";

import NavBar from "./NavBar";
import Footer from "./Footer";

import imgPortada from "../../assets/portada.png";
import { Link } from "react-router-dom";

function Template({ children, footer, navbar, hscreen, footerInfo }) {
  return (
    <>
      <main
        className="container mx-auto px-3"
        style={{ height: hscreen ? "100vh" : "100%" }}
      >
        <header className="relative mt-5">
          <Link to="/">
            <img className="mx-auto" width={200} src={imgPortada} alt="" />
          </Link>
        </header>
        <hr className="border-2 border-neutral-400" />

        {navbar ? (
          <article className="flex flex-wrap">
            <NavBar />
            <section className="w-2/4 flex-1">{children}</section>
          </article>
        ) : (
          <section className="h-3/5">{children}</section>
        )}
      </main>
      {footer && <Footer footer={footer} info={footerInfo} />}
    </>
  );
}
export default Template;

Template.propTypes = {
  children: PropTypes.any,
  footer: PropTypes.bool,
  navbar: PropTypes.bool,
  hscreen: PropTypes.bool,
  footerInfo: PropTypes.bool,
};

Template.defaultProps = {
  footer: true,
  navbar: true,
  footerInfo: true,
  hscreen: false,
};
