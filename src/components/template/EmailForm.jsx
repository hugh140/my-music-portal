function EmailForm() {
  function setInvalidMessage(message, event) {
    event.target.setCustomValidity(message);
  }

  return (
    <article className="mb-5">
      <h2 className="my-3 text-xl">Correo:</h2>
      <form>
        <label className="mb-1 block" htmlFor="nombre">
          Nombre:
        </label>
        <input
          className="w-full rounded-md border-2 border-neutral-800 px-2 py-1 text-black
          invalid:text-red-500"
          placeholder="Antonio"
          type="text"
          name="nombre"
          id="nombre"
          pattern="^[a-zA-Z\s'\-]{1,}$"
          onInvalid={(event) =>
            setInvalidMessage(
              "El nombre es incorrecto, no se aceptan caracteres especiales.",
              event
            )
          }
          onInput={(event) => setInvalidMessage("", event)}
          required
        />
        <label className="my-1 block" htmlFor="correo">
          Correo electrónico:
        </label>
        <input
          className="w-full rounded-md border-2 border-neutral-800 px-2 py-1 text-black
          invalid:text-red-500"
          placeholder="xyz123@foo.com"
          type="email"
          name="correo"
          id="correo"
          onInvalid={(event) =>
            setInvalidMessage(
              "El correo electrónico es incorrecto.",
              event
            )
          }
          onInput={(event) => setInvalidMessage("", event)}
          required
        />
        <label className="my-1 block" htmlFor="contenido">
          Contenido:
        </label>
        <textarea
          className="w-full rounded-md border-2 border-neutral-800 px-2 py-1 text-black
          invalid:text-red-500"
          name="contenido"
          id="contenido"
          cols="30"
          rows="5"
          minLength={20}
          maxLength={1000}
          onInvalid={(event) =>
            setInvalidMessage(
              "El rango de caracteres es de 20 a 1000.",
              event
            )
          }
          onInput={(event) => setInvalidMessage("", event)}
          required
        ></textarea>
        <button
          className="mt-1 w-full rounded-md bg-neutral-700 p-3 hover:bg-white hover:text-black
          md:w-auto"
          type="submit"
        >
          Enviar
        </button>
      </form>
    </article>
  );
}
export default EmailForm;
