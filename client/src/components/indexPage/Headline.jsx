function Headline() {
  return (
    <article
      className="border-2 border-t-0 border-neutral-200 p-5 hover:bg-neutral-100"
      id="headline"
    >
      <a href="#">
        <div className="relative">
          <img
            className="w-full rounded object-cover"
            src="https://picsum.photos/1000/500?grayscale"
            alt=""
          />
          <div
            className="absolute start-1/2 top-0 hidden h-full w-full -translate-x-1/2 bg-black opacity-30 
                  duration-100 md:block"
            id="black-bg"
          />
          <div className="bottom-10 md:absolute md:start-1/2 md:w-11/12 md:-translate-x-1/2 md:text-white">
            <h2 className="my-3 text-2xl font-bold">Lorem ipsum dolor sit.</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis
              aspernatur soluta neque nobis iusto quos est sunt autem culpa, rem
              exercitationem expedita harum nesciunt aliquam? Modi dolor
              repudiandae excepturi quam!
            </p>
          </div>
        </div>
      </a>
    </article>
  );
}
export default Headline;