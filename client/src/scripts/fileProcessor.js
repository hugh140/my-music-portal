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

export { getImgUrl, toBase64Binaries };
