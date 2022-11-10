import React, { useState } from 'react';

import Icon from '../ui/Icon';
import Dropzone from '../posts/Dropzone';
import ImageCropper from '../posts/ImageCropper';

const AvatarCropper = (props) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [status, setStatus] = useState(1);
  const [croppedImg, setCroppedImg] = useState(null);

  const getImageHandler = (src) => {
    setImageSrc(src);
  };

  const changeStatus = (status) => {
    setStatus(status);
  };

  const tempCropHandler = (canvas) => {
    setCroppedImg(canvas);
  };

  const cropHandler = () => {
    props.onCanvas(croppedImg);
    props.onEdit();
  };

  return (
    <div className="bg-white-100 rounded flex flex-col items-center px-6 py-6 cursor-default w-[60rem] h-[47rem] relative">
      <Icon
        name="close"
        style="absolute top-2 right-2 text-4xl hover:scale-110 transition-all"
        onClick={props.onEdit}
      />
      {status === 1 && (
        <Dropzone onSrc={getImageHandler} onStatus={changeStatus} />
      )}
      {status === 2 && (
        <>
          <Icon
            name="arrow-back"
            style="absolute top-2 left-2 text-4xl hover:scale-110 transition-all"
            onClick={() => setStatus(1)}
          />
          <ImageCropper src={imageSrc} onCanvas={tempCropHandler} />
          <a
            onClick={cropHandler}
            className="bg-primary-main px-4 py-2 text-white-100 rounded mt-4 hover:bg-primary-tint-200"
          >
            Crop
          </a>
        </>
      )}
    </div>
  );
};

export default AvatarCropper;
