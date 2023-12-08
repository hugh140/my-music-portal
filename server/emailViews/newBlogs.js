function newBlogsHTML(blog) {
  return `
    <h2>¡Disfruta de este nuevo blog!</h2>
    <a href="${process.env.CLIENT_URL}/blog/${blog._id}">
      <h1>${blog.title}</h1>
      <img src="${blog.headerImg}" />
      <p>${
        blog?.blogContent?.find((content) => content.type === "paragraph")?.content
      }</p>
    </a>
  `;
}
module.exports = newBlogsHTML;
