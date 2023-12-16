async function fileAsciiTree(files) {
  let asciiText = "";
  let filePath = [];
  let depthValue = 0;

  for await (const file of files) {
    const filePathSplit = file.path.split("/").slice(1);

    if (filePathSplit.slice(0, -1).toString() !== filePath.toString())
      for (let i = 0; i <= filePathSplit.length; i++) {
        if (filePathSplit[i] === filePath[i]) continue;

        const onlyPath = filePathSplit.slice(0, -1);
        const filePathInit = filePath;
        const lengthDifference = filePath.length < onlyPath.length;
        filePath = onlyPath;

        if (lengthDifference) {
          const differenceNumber = onlyPath.length - filePathInit.length;
          for (let j = differenceNumber; j > 0; j--) {
            asciiText += "|-- ".repeat(depthValue) + filePath.at(-j) + "/\n";
            depthValue++;
          }
        } else {
          depthValue = onlyPath.length - 1
          if (filePathInit.length < onlyPath.length)
          asciiText += "|-- ".repeat(depthValue) + filePath.at(-1) + "/\n";
          depthValue++;
          // console.log(depthValue, filePath)
        }
        break;
      }
    asciiText += "|-- ".repeat(depthValue) + file.path.split("/").at(-1) + "\n";
  }
  return asciiText;
}
export default fileAsciiTree;
