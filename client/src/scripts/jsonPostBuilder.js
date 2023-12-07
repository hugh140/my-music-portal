import { toBase64Binaries } from "./fileProcessor";

function jsonPostBuilder(evt) {
  return new Promise((resolve) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);

    const imgFiles = [formData.get("header")];

    for (const img of formData.getAll("img")) imgFiles.push(img);

    const base64Imgs = [];
    (async function processImages() {
      for (const file of imgFiles) {
        const binaries = await toBase64Binaries(file);
        base64Imgs.push(binaries);
      }
    })();

    const buildedJson = { title: null, headerImg: null, blogContent: [] };
    let indexImgs = 0;
    setTimeout(() => {
      for (const entry of formData)
        switch (entry[0]) {
          case "title":
            buildedJson.title = entry[1];
            break;

          case "header":
            buildedJson.headerImg = base64Imgs[indexImgs];
            indexImgs++;
            break;

          case "text":
            if (entry[1])
              buildedJson.blogContent.push({
                type: "paragraph",
                content: entry[1],
              });
            break;

          case "img":
            if (base64Imgs[indexImgs])
              buildedJson.blogContent.push({
                type: "image",
                content: base64Imgs[indexImgs],
              });
            indexImgs++;
            break;
        }
      resolve(JSON.stringify(buildedJson));
    }, 50 * imgFiles.length);
  });
}

export default jsonPostBuilder;
