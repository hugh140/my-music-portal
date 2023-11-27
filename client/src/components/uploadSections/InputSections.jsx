import { useDropzone } from "react-dropzone";
import { useState } from "react";
import { getImgUrl } from "../../scripts/fileProcessor";
import PropTypes from "prop-types";

function ImgSection({ name }) {
  const [inputImg, setInputImg] = useState(null);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (imgs) => {
      getImgUrl(imgs[0], (url) => setInputImg(url));
    },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className="h-50 my-4 flex cursor-pointer rounded-md
      border-2 border-dashed hover:border-zinc-400"
      style={{ minHeight: "10rem", minWidth: "10rem" }}
    >
      <input {...getInputProps()} name={name} required />
      {inputImg ? (
        <img
          src={inputImg}
          className="mx-auto"
          style={{ maxHeight: "400px" }}
          alt=""
        />
      ) : (
        <p className="w-full p-20 text-center">
          Selecciona o dropea una imagen.
        </p>
      )}
    </div>
  );
}

function TextSection() {
  return (
    <textarea
      rows="5"
      placeholder="..."
      name="text"
      className="mt-5 w-full rounded-md border-2 p-2"
      required
    />
  );
}

ImgSection.propTypes = {
  name: PropTypes.string,
};

export { ImgSection, TextSection };
