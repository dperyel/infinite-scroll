import React, { Fragment } from "react";
import { ImageInfoList } from "../../utils/image/ImageInfoList";
import { Image } from "./Image";
import { ImageInfo } from "../../utils/image/types";

interface ImageBlockProps {
    infoList: ImageInfoList;
}

export const ImageBlock: React.FC<ImageBlockProps> = (props) => {
    const infoList = props.infoList;

    const arr = infoList.mapToArray<ImageInfo>(v => v);

    return (<Fragment>
        <p>Counter is {infoList.getSize()}</p>
        {arr.map(image => <Image key={image.id} info={image} />)}
    </Fragment>);
}