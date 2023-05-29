function LiveAnimations() {
  return (
    <article className="border-2 border-neutral-200 p-5" id="musica">
      <div className="relative h-12">
        <h2 className="absolute mb-5 text-xl font-semibold">Live Animations</h2>
        <a className="absolute end-0 text-blue-700 hover:underline" href="">
          Ver más &raquo;
        </a>
      </div>
      <div
        className="grid grid-cols-none place-content-center gap-4 sm:grid-cols-2 
              xl:grid-cols-3"
      >
        <a
          href="renacer.html"
          target="_blank"
          className="mb-4  w-60 decoration-blue-700 
                    underline-offset-2 hover:underline"
        >
          <img
            className="aspect-video rounded object-cover"
            src="https://picsum.photos/1000/500"
            alt=""
          />
          <h3 className="text-md mt-2 font-semibold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident,
            et?
          </h3>
        </a>
        <a
          href="eter.html"
          target="_blank"
          className="mb-4  w-60 decoration-blue-700 
                    underline-offset-2 hover:underline"
        >
          <img
            className="aspect-video rounded object-cover"
            src="https://picsum.photos/1000/500"
            alt=""
          />
          <h3 className="text-md mt-2 font-semibold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident,
            et?
          </h3>
        </a>
        <a
          href="#"
          target="_blank"
          className="mb-4 w-60 decoration-blue-700 
                    underline-offset-2 hover:underline"
        >
          <img
            className="aspect-video rounded object-cover"
            src="https://picsum.photos/1000/500"
            alt=""
          />
          <h3 className="text-md mt-2 font-semibold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident,
            et?
          </h3>
        </a>
      </div>
    </article>
  );
}
export default LiveAnimations;
