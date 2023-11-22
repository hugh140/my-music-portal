function jsonPostBuilder(evt) {
  return new Promise((resolve) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);

    const imgFiles = [formData.get("header")];
    for (const img of formData.getAll("img")) imgFiles.push(img);

    const base64Imgs = [];
    for (const file of imgFiles)
      toBase64Binaries(file, (binaries) => {
        base64Imgs.push(binaries);
      });

    const buildedJson = { title: null, headerImg: null, blogContent: [] };
    let indexImgs = 0;

    setTimeout(() => {
      for (const entry of formData) {
        switch (entry[0]) {
          case "title":
            buildedJson.title = entry[1];
            break;

          case "header":
            buildedJson.headerImg = base64Imgs[indexImgs];
            indexImgs++;
            break;

          case "text":
            buildedJson.blogContent.push({
              type: "paragraph",
              content: entry[1],
            });
            break;

          case "img":
            buildedJson.blogContent.push({
              type: "image",
              content: base64Imgs[indexImgs],
            });
            indexImgs++;
            break;
        }
      }
      resolve(buildedJson);
    }, 50 * imgFiles.length);
  });
}

export default jsonPostBuilder;

async function toBase64Binaries(file, callback) {
  const fileReader = new FileReader();
  fileReader.onload = () => callback(btoa(fileReader.result));
  fileReader.onerror = (err) => callback(err);
  fileReader.readAsBinaryString(file);
}
