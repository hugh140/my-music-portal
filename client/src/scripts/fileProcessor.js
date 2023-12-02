function getImgUrl(img, callback) {
  const fileReader = new FileReader();
  fileReader.onload = () => callback(fileReader.result);
  fileReader.onerror = (err) => callback(err);
  fileReader.readAsDataURL(img);
}

async function toBase64Binaries(file, callback) {
  const fileReader = new FileReader();
  fileReader.onload = () => callback(btoa(fileReader.result));
  fileReader.onerror = (err) => callback(err);
  fileReader.readAsBinaryString(file);
}

async function getImgFromUrl(imgUrl, callback) {
  try {
    let blob = await fetch(imgUrl);
    blob = await blob.blob();
    getImgUrl(blob, (result) => callback(result, blob));
  } catch (e) {
    console.error(e);
  }
}

export { getImgUrl, toBase64Binaries, getImgFromUrl };
