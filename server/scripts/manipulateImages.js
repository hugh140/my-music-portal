const { writeFileSync, existsSync, unlinkSync } = require("fs");

const imagesDir = __dirname + "/../public/images/";

function saveImgBinaries(binaries) {
  let fileName = Date.now();

  if (existsSync(imagesDir + fileName)) fileName++;

  const dirFile = `${imagesDir}/${fileName}.jpeg`;
  const imgBinaries = Buffer.from(binaries, "base64");

  writeFileSync(dirFile, imgBinaries);

  return `${process.env.SERVER_URL}/images/${fileName}.jpeg`;
}

function deleteImages(imageURL) {
  const fileName = imageURL.split("/").at(-1);
  unlinkSync(imagesDir + fileName)
}
module.exports = { deleteImages, saveImgBinaries };
