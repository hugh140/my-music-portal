function newSoftwareHTML(info) {
  return `
    <h2>¡Disfruta de esta nueva aplicación!</h2>
    <a href="${info.url}">
      <h1>${info.title}</h1>
      <img src="${info.img}" />
    </a>
  `;
}
module.exports = newSoftwareHTML;
