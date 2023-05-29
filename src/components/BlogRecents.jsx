function BlogRecents() {
  return (
    <article className="border-2 border-neutral-200 p-5" id="blog">
      <div className="relative h-12">
        <h2 className="absolute mb-5 text-xl font-semibold">Recientes</h2>
        <a className="absolute end-0 text-blue-700 hover:underline" href="">
          Ver más &raquo;
        </a>
      </div>
      <div className="flex w-full snap-x gap-4 overflow-x-auto">
        {[
          Array(6).fill(
            <a
              href="#"
              className="mb-4 w-60 shrink-0 snap-start overflow-hidden decoration-blue-700 
                    underline-offset-2 hover:underline"
            >
              <img
                className="aspect-video rounded object-cover"
                src="https://picsum.photos/1000/500"
                alt=""
              />
              <h3 className="text-md mt-2 font-semibold">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Provident, et?
              </h3>
            </a>
          ),
        ]}
      </div>
    </article>
  );
}
export default BlogRecents;
