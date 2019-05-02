import React, { CSSProperties } from "react";
import { ImageInfo } from "../../utils/image/types";
import "./Image.css";

interface ImageProps {
    info: ImageInfo;
}

export const Image: React.FC<ImageProps> = ({ info }) => {

    const imageInfo = info.images.fixed_width_downsampled;
    const frameStyle: CSSProperties = {
        height: `${imageInfo.height}px`,
        width: `${imageInfo.width}px`,
        backgroundImage: `url(${imageInfo.url})`,
    }

    return <div className="Image" style={frameStyle} />
}
