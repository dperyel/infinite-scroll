import React, { Fragment, RefObject } from "react";
import { ImageInfoList } from "../../utils/image/ImageInfoList";
import { Image } from "./Image";
import { useScroll } from "./useScroll";

interface ImageBlockProps {
    imageList: ImageInfoList;
    approachingBottomNotifier: () => void;
}

export const ImageBlock: React.FC<ImageBlockProps> = (props) => {

    const { imageList, approachingBottomNotifier } = props;
    const containerRef: RefObject<HTMLDivElement> = React.createRef();

    const {
        visibleList,
        imageTapeStyle,
    } = useScroll(imageList, containerRef, approachingBottomNotifier);

    return (
        <Fragment>
            <div style={imageTapeStyle}>
                <div ref={containerRef}>
                    {visibleList.mapToArray(image => <Image key={image.id} info={image} />)}
                </div>
            </div>
            <p>Loading...</p>
        </Fragment>
    );
}