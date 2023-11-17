import Template from "../../components/template/template";
import { Link } from "react-router-dom";

const buttonOptions = [
  { name: "Blog", link: "/upload/blog" },
  { name: "Software", link: "/" },
];

function UploadPage() {
  return (
    <Template footer={false} navbar={false}>
      <main className="h-96 grid-cols-2 lg:grid">
        <div className="m-10 text-6xl lg:text-end lg:text-9xl">
          ¿Qué deseas subir?
        </div>
        <div className="m-10 flex flex-wrap content-center">
          {buttonOptions.map((button) => (
            <Link
              key={button.name}
              to={button.link}
              className="mb-10 w-full border-2 border-black p-5 text-center text-2xl 
            hover:bg-black hover:text-white active:bg-white"
            >
              <button>{button.name}</button>
            </Link>
          ))}
        </div>
      </main>
    </Template>
  );
}
export default UploadPage;
