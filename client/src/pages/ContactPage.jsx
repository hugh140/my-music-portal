import Template from "../components/template/Template";
import socialMediaLinks from "../utilities/socialMedias";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ContactPage() {
  function handleSubmit(evt) {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const uri = new URLSearchParams();
    uri.append("subject", formData.get("subject"));
    uri.append("body", formData.get("body"));

    window.open(
      `mailto:hugofer300@gmail.com?${uri}`,
      "",
      "height=600,width=400,scrollbars=no,left=100,top=100"
    );
  }

  return (
    <Template>
      <main className="p-5">
        <h1 className="text-center text-3xl font-bold">¡Contáctame!</h1>
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="w-full">
            <h2 className="my-3 text-xl font-bold">Envíanos un correo:</h2>
            <form className="my-3" onSubmit={handleSubmit}>
              <label htmlFor="subject">Asunto:</label>
              <br />
              <input
                type="text"
                name="subject"
                id="subject"
                className="mb-4 mt-1 w-full rounded border-2 border-zinc-500 p-1"
              />
              <br />
              <label htmlFor="body">Cuerpo:</label>
              <br />
              <textarea
                name="body"
                id="body"
                cols="30"
                rows="5"
                className="mb-4 mt-1 w-full rounded border-2 border-zinc-500 p-1"
              ></textarea>
              <br />
              <button
                type="submit"
                className="rounded-lg border-2 border-black p-2 hover:bg-black 
              hover:text-white active:bg-white active:text-black font-bold"
              >
                Enviar Correo
              </button>
            </form>
          </div>

          <div className="w-full">
            <h2 className="mb-9 mt-3 text-xl font-bold">
              O síguenos en nuestras redes sociales:
            </h2>
            <ul>
              {socialMediaLinks.map((socialMedia) => (
                <li
                  key={socialMedia.name}
                  className="my-2 list-none 
                  rounded-lg border-2 border-black bg-white p-2 text-xl 
                  hover:text-white hover:bg-black"
                >
                  <a
                    href={socialMedia.link}
                    rel="noreferrer"
                    target="_blank"
                    className="underline-"
                  >
                    <FontAwesomeIcon className="me-2" icon={socialMedia.icon} />
                    {socialMedia.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </Template>
  );
}
export default ContactPage;
