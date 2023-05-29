function EmailForm() {
  return (
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
        <button
          className="mt-1 w-full rounded-md bg-neutral-700 p-3 md:w-auto hover:bg-white
          hover:text-black"
          type="submit"
        >
          Enviar
        </button>
      </form>
    </article>
  );
}
export default EmailForm;
