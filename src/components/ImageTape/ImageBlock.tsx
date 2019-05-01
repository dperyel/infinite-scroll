import React, { Fragment, useEffect, useState } from "react";
import { ImageInfoList } from "../../utils/image/ImageInfoList";
import { Image } from "./Image";
import { ImageInfo } from "../../utils/image/types";
import { VisibleImageList } from "../../utils/image/VisibleImageList";
import { ImageNode } from "../../utils/image/ImageNode";

interface ImageBlockProps {
    infoList: ImageInfoList;
}

const shiftDirection = (imageNode: ImageNode) => imageNode.getNext();

export const ImageBlock: React.FC<ImageBlockProps> = (props) => {
    const [visibleList, setVisibleList] = useState(new VisibleImageList())
    const infoList = props.infoList;

    useEffect(() => {
        let tail: ImageNode = infoList.getHead() as ImageNode;
        for (let i = 0; i < 10; i++) {
            tail = tail.getNext() as ImageNode;
        }

        const list = new VisibleImageList()
            .setHead(infoList.getHead() as ImageNode)
            .setTail(tail);

        setVisibleList(list);
    }, [infoList]);

    useEffect(() => {
        const interval = setInterval(() => {
            const shiftedList = visibleList.shiftList(shiftDirection);

            setVisibleList(shiftedList);
        }, 10);

        return () => {
            clearInterval(interval);
        }
    });

    return (<Fragment>
        <p>Counter is {infoList.getSize()}</p>
        {visibleList.mapToArray<ImageInfo>(v => v).map(image => <Image key={image.id} info={image} />)}
    </Fragment>);
}