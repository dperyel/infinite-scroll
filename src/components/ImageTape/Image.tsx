import React, { CSSProperties } from "react";
import { ImageInfo } from "../../utils/image/types";

interface ImageProps {
    info: ImageInfo;
}

const imageStyle: CSSProperties = {
    width: "300px",
    height: "200px",
    backgroundColor: "#333333",
};

export const Image: React.FC<ImageProps> = ({ info }) => {
    return <div style={imageStyle}>{info.id}</div>
}
