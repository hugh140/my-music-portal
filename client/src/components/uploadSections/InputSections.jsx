import { useDropzone } from "react-dropzone";
import { getImgFromUrl } from "../../scripts/fileProcessor";
import { useEffect, useState } from "react";
import { getImgUrl } from "../../scripts/fileProcessor";
import PropTypes from "prop-types";

function ImgSection({ name, value, index }) {
  const [inputImg, setInputImg] = useState(null);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (imgs) => {
      getImgUrl(imgs[0], (url) => setInputImg(url));
    },
    multiple: false,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
    },
  });

  useEffect(() => {
    if (value)
      getImgFromUrl(value, (imgUrl, blob) => {
        const inputFile = document.getElementById("imgInput" + index);
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(new File([blob], "ImgFile"));
        inputFile.files = dataTransfer.files;
        setInputImg(imgUrl);
      });
  }, [value, index]);

  return (
    <div
      {...getRootProps()}
      className="h-50 my-4 flex cursor-pointer rounded-md
      border-2 border-dashed hover:border-zinc-400"
      style={{ minHeight: "10rem", minWidth: "10rem" }}
    >
      <input {...getInputProps()} name={name} id={"imgInput" + index} />
      {inputImg ? (
        <img
          src={inputImg}
          className="mx-auto"
          style={{ maxHeight: "400px" }}
        />
      ) : (
        <p className="w-full p-20 text-center">
          Selecciona o dropea una imagen.
        </p>
      )}
    </div>
  );
}

function TextSection({ value }) {
  return (
    <textarea
      rows="5"
      placeholder="..."
      name="text"
      className="mt-5 w-full rounded-md border-2 p-2"
      defaultValue={value}
    />
  );
}

ImgSection.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  index: PropTypes.number,
};
TextSection.propTypes = {
  value: PropTypes.string,
};

export { ImgSection, TextSection };
