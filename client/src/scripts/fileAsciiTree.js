async function fileAsciiTree(files) {
  let asciiText = "";
  let filePath = "";

  for await (const file of files) {
    const filePathSplit = file.path.split("/");
    if (filePathSplit.slice(0, -1).toString() !== filePath.toString())
      for (let i = 0; i <= filePathSplit.length; i++) {
        if (filePathSplit[i] === filePath[i]) continue;
        const lengthDifference = filePath.length < filePathSplit.length;
        filePath = filePathSplit.slice(0, -1);
        if (lengthDifference)
          asciiText +=
            "|-- ".repeat(filePath.length - 2) + filePath.at(-1) + "/\n";
        break;
      }
    asciiText +=
      "|-- ".repeat(filePath.length - 1) + file.path.split("/").at(-1) + "\n";
  }
  return asciiText;
}
export default fileAsciiTree;
