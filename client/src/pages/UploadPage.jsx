import Template from "../components/template/template";

function UploadPage() {
  return (
    <Template footer={false} navbar={false}>
      <main className="lg:grid h-96 grid-cols-2">
        <div className="m-10 lg:text-end lg:text-9xl text-6xl">¿Qué deseas subir?</div>
        <div className="m-10 flex-wrap content-center flex">
          <button
            className="mb-10 w-full border-2 border-black p-5 text-2xl hover:bg-black 
            hover:text-white active:bg-white"
          >
            Blog
          </button>
          <button
            className="mb-10 w-full border-2 border-black p-5 text-2xl hover:bg-black 
            hover:text-white active:bg-white"
          >
            Software
          </button>
        </div>
      </main>
    </Template>
  );
}
export default UploadPage;
