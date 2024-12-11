import React from "react";
import { ORIGIN } from "../../utils/constants";

interface PictureServerProps {
  smallPic: string;
  mediumPic: string;
  bigPic: string;
  className: string;
  imgPath: string;
  overlayClassName?: string;
  alt: string;
}

const PictureServer: React.FC<PictureServerProps> = ({
  smallPic,
  mediumPic,
  bigPic,
  className,
  imgPath,
  overlayClassName = "",
  alt,
}) => {
  const origin = ORIGIN;

  return (
    <picture className={className}>
      <div className={overlayClassName}></div>
      <source
        media="(max-width: 425px)"
        srcSet={`${imgPath}${smallPic}`}
      />
      <source
        media="(max-width: 768px)"
        srcSet={`${imgPath}${mediumPic}`}
      />
      <source
        media="(max-width: 1024px)"
        srcSet={`${imgPath}${bigPic}`}
      />
      <img
        src={`${imgPath}${bigPic}`}
        alt={alt}
        crossOrigin={origin}
      />
    </picture>
  );
};

export default PictureServer;
