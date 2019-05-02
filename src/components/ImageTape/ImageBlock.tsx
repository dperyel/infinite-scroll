import React, { Fragment, useEffect, useState, CSSProperties, RefObject } from "react";
import { ImageInfoList } from "../../utils/image/ImageInfoList";
import { Image } from "./Image";
import { VisibleImageList } from "../../utils/image/VisibleImageList";
import { ImageNode } from "../../utils/image/ImageNode";

interface ImageBlockProps {
    infoList: ImageInfoList;
    totalImageHeight: number;
}

const shiftRight = (imageNode: ImageNode) => imageNode.getNext();
const shiftLeft = (imageNode: ImageNode) => imageNode.getPrevious();

const defaultImageTapeStyle: CSSProperties = {
    paddingTop: 0,
    paddingBottom: 0,
};

const visibleElements = 20;
const imageHeight = 200;
const thresholdToSwapImages = 10 * imageHeight;

export const ImageBlock: React.FC<ImageBlockProps> = (props) => {
    const infoList = props.infoList;
    const containerRef: RefObject<HTMLDivElement> = React.createRef();

    const [visibleList, setVisibleList] = useState(new VisibleImageList());
    const [imageTapeStyle, setImageTapeStyle] = useState(defaultImageTapeStyle);

    useEffect(() => {
        let tail: ImageNode = infoList.getHead() as ImageNode;

        for (let i = 0; i < visibleElements; i++) {
            tail = tail.getNext() as ImageNode;
        }

        const totalSize = infoList.getSize();
        const extraPadding = (totalSize - visibleElements) * imageHeight;

        setImageTapeStyle({
            ...defaultImageTapeStyle,
            paddingBottom: props.totalImageHeight,
        });

        const list = new VisibleImageList()
            .setHead(infoList.getHead() as ImageNode)
            .setTail(tail);

        setVisibleList(list);
    }, [infoList]);

    useEffect(() => {
        const onScroll = () => {
            if (containerRef.current) {
                const containerPosition = containerRef.current.getBoundingClientRect();
                const viewportHeight = window.innerHeight;

                // TODO isolate it to a separate function with direction
                if (containerPosition.bottom - viewportHeight < thresholdToSwapImages) {
                    const shiftedList = visibleList.shiftList(shiftRight);
                    if (shiftedList === visibleList) {
                        return;
                    }
                    setVisibleList(shiftedList);
                
                    const paddingBottom = imageTapeStyle.paddingBottom as number - imageHeight;
                    const paddingTop = imageTapeStyle.paddingTop as number + imageHeight;

                    setImageTapeStyle({
                        ...imageTapeStyle,
                        paddingBottom: paddingBottom,
                        paddingTop: paddingTop,
                    });

                } else if (containerPosition.top + thresholdToSwapImages >= 0) {
                    const shiftedList = visibleList.shiftList(shiftLeft);

                    if (shiftedList === visibleList) {
                        return;
                    }

                    setVisibleList(shiftedList);

                    const paddingBottom = imageTapeStyle.paddingBottom as number + imageHeight;
                    const paddingTop = imageTapeStyle.paddingTop as number - imageHeight;

                    setImageTapeStyle({
                        ...imageTapeStyle,
                        paddingBottom: paddingBottom,
                        paddingTop: paddingTop,
                    });
                }
            }
        };

        window.addEventListener("scroll", onScroll, false);

        return () => {
            window.removeEventListener("scroll", onScroll, false);
        };
    }, [visibleList, imageTapeStyle, containerRef]);

    return <Fragment>
        <p>Counter is {infoList.getSize()}</p>
        <div style={imageTapeStyle}>
            <div ref={containerRef}>
                {visibleList.mapToArray(image => <Image key={image.id} info={image} />)}
            </div>
        </div>
        <p>Loading...</p>
    </Fragment>;
}