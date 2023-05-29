import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EmailForm from "./EmailForm";
import socialMediaLinks from "../../utilities/socialMedias";

function Footer() {
  return (
    <footer className="bg-neutral-900">
      <main className="container mx-auto p-10 py-10 text-white">
        <h2 className="mb-5 text-center text-2xl font-bold">Contáctame</h2>
        <section className="grid grid-cols-none md:grid-cols-2">
          <article className="mb-5">
            <h2 className="my-3 text-xl">Redes:</h2>
            <ul>
              {socialMediaLinks.map((socialMedia) => (
                <li key={socialMedia.name}>
                  <a
                    href=""
                    rel="noreferrer"
                    target="_blank"
                    className={`underline-offset-3 underline-${socialMedia.color} 
                    hover:underline`}
                  >
                    <FontAwesomeIcon className="me-2" icon={socialMedia.icon} />
                    {socialMedia.name}
                  </a>
                </li>
              ))}
            </ul>
          </article>
          <EmailForm />
        </section>
      </main>
    </footer>
  );
}
export default Footer;
