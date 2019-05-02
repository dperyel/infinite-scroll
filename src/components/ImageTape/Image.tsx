import React, { CSSProperties, useState } from "react";
import { ImageInfo } from "../../utils/image/types";

interface ImageProps {
    info: ImageInfo;
}

const defaultFrameStyle: CSSProperties = {
    width: 240,
    height: 200,
    backgroundColor: "#333333",
};

export const Image: React.FC<ImageProps> = ({ info }) => {

    const frameStyle = {
        ...defaultFrameStyle,
        height: info.images.fixed_width_downsampled.height,
    }

    return <div style={frameStyle}>
        <img
            width={info.images.fixed_width_downsampled.width}
            height={info.images.fixed_width_downsampled.height}
            alt={info.title}
            src={info.images.fixed_width_downsampled.url} />
    </div>
}
