const { readdirSync, writeFileSync, existsSync } = require("fs");

const imagesDir = __dirname + "/../public/images/";

function saveImgBinaries(binaries) {
  let fileName = Date.now();

  if (existsSync(imagesDir + fileName)) fileName++;

  const dirFile = `${imagesDir}/${fileName}.jpeg`;
  const imgBinaries = Buffer.from(binaries, "hex");

  writeFileSync(dirFile, imgBinaries, (error) => {
    if (error) console.error(error);
  });

  return `${process.env.SERVER_URL}/images/${fileName}.jpeg`;
}
module.exports = saveImgBinaries;
