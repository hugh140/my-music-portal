function EmailForm() {
  function setInvalidMessage(message, event) {
    event.target.setCustomValidity(message);
  }

  function sendEmail(event) {
    event.preventDefault()

    const name = event.target[0].value
    const email = event.target[1].value
    const content = event.target[2].value
    window.open(`mailto:${email}?subject=${name}&body=${content}`);
  }

  return (
    <article className="mb-5 mt-12">
      <h2 className="text-xl">¡Suscríbete, es gratis!</h2>
      <p className="mb-3">Así podrás enterarte de las últimas publicaciones por correo.</p>
      <form onSubmit={sendEmail}>
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
          className="w-full rounded-md border-2 border-neutral-800 px-2 py-2 text-black
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
        <button
          className="mt-3 w-full rounded-md bg-neutral-700 p-3 hover:bg-white hover:text-black
          md:w-auto"
          type="submit"
        >
          Suscribirse
        </button>
      </form>
    </article>
  );
}
export default EmailForm;
