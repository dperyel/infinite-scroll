import React from "react";
import { ImageInfo } from "../../utils/image/types";

interface ImageProps {
    info: ImageInfo;
}

export const Image: React.FC<ImageProps> = ({ info }) => {
    return <div>{info.id}</div>
}
