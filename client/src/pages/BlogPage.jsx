import Template from "../components/template/Template";
import useBlog from "../hooks/blog";
import { useParams } from "react-router-dom";

function BlogPage() {
  const { id } = useParams();
  const blog = useBlog(id);

  return (
    <Template>
      <section className="p-5 sm:px-10">
        <h1 className="text-3xl font-bold">{blog?.title}</h1>
        <img
          className="my-5 aspect-video w-full rounded object-cover"
          src={blog?.headerImg}
          alt=""
        />
        {blog?.blogContent?.map((section, index) => {
          switch (section.type) {
            case "paragraph":
              return <p className="whitespace-pre-line" key={index}>{section.content}</p>;
            case "image":
              return (
                <img
                  className="my-5 aspect-video w-full rounded object-cover"
                  src={section.content}
                  alt=""
                  key={index}
                />
              );
          }
        })}
        <br />
      </section>
    </Template>
  );
}
export default BlogPage;
