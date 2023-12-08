import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EmailForm from "./EmailForm";
import socialMediaLinks from "../../utilities/socialMedias";

import navbarOptions from "../../utilities/navbarOptions";

function Footer({ info }) {
  return (
    <footer className="bg-neutral-900">
      <main className="container mx-auto p-10 py-10 text-white">
        <ul
          className="grid grid-cols-none place-content-center text-center 
              md:grid-cols-5"
        >
          {navbarOptions.map((option) => (
            <a key={option.text} href={option.link}>
              <li
                className="w-full px-10 py-1 font-semibold hover:bg-neutral-100 hover:text-black
                    active:bg-black active:text-white md:py-3"
              >
                {option.text}
              </li>
            </a>
          ))}
        </ul>
        {info && (
          <section className="grid grid-cols-none md:grid-cols-2">
            <article className="mb-10 mt-10 text-center md:text-start">
              <h2 className="my-3 text-xl">¡Sígueme en mis redes!</h2>
              <ul>
                {socialMediaLinks.map((socialMedia) => (
                  <li key={socialMedia.name}>
                    <a
                      href={socialMedia.link}
                      rel="noreferrer"
                      target="_blank"
                      className={`underline-offset-3 underline-${socialMedia.color} 
                      hover:underline`}
                    >
                      <FontAwesomeIcon
                        className="me-2"
                        icon={socialMedia.icon}
                      />
                      {socialMedia.name}
                    </a>
                  </li>
                ))}
              </ul>
            </article>

            <EmailForm />
          </section>
        )}
      </main>
    </footer>
  );
}
export default Footer;

Footer.propTypes = {
  info: PropTypes.bool,
};

Footer.defaultProps = {
  info: true,
};
