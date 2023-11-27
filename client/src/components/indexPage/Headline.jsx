import PropTypes from "prop-types";

function Headline({ header }) {
  return (
    <article
      className="border-2 border-t-0 border-neutral-200 p-5 hover:bg-neutral-100"
      id="headline"
    >
      <a href={`/blog/${header?._id}`}>
        <div className="relative">
          <img
            className="aspect-video w-full rounded object-cover"
            src={header?.headerImg}
            alt={header?.title}
          />
          <div
            className="absolute start-1/2 top-0 hidden h-full w-full -translate-x-1/2 bg-black opacity-30 
                  duration-100 md:block"
            id="black-bg"
          />
          <div className="bottom-10 md:absolute md:start-1/2 md:w-11/12 md:-translate-x-1/2 md:text-white">
            <h2 className="my-3 text-2xl font-bold">{header?.title}</h2>
          </div>
        </div>
      </a>
    </article>
  );
}
export default Headline;

Headline.propTypes = {
  header: PropTypes.object,
};
