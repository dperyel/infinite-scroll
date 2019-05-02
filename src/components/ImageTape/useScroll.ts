import { useEffect, useState, RefObject, CSSProperties } from "react";
import { VisibleImageList } from "../../utils/image/VisibleImageList";
import { ImageNode } from "../../utils/image/ImageNode";
import { ImageInfoList } from "../../utils/image/ImageInfoList";
import { Nullable } from "../../utils/data-structures/types";

const shiftRight = (imageNode: ImageNode) => imageNode.getNext();
const shiftLeft = (imageNode: ImageNode) => imageNode.getPrevious();

const defaultImageTapeStyle: CSSProperties = {
    paddingTop: 0,
    paddingBottom: 0,
};

const visibleElements = 20;
const thresholdToSwapImages = 1000;
const defaultPaddingOnNewData = 10000;

function getHeightFromNode(node: Nullable<ImageNode>): number {
    if (node) {
        return Number(node.getValue().images.fixed_width_downsampled.height);
    }

    return 0;
}
interface UseScrollResult {
    visibleList: VisibleImageList,
    imageTapeStyle: CSSProperties,
};
type UseScroll = (
    infoList: ImageInfoList,
    containerRef: RefObject<HTMLDivElement>,
    appRoachingBottomNotifyer?: () => void) => UseScrollResult;

export const useScroll: UseScroll = (infoList, containerRef, appRoachingBottomNotifyer?) => {

    const [visibleList, setVisibleList] = useState(new VisibleImageList());
    const [imageTapeStyle, setImageTapeStyle] = useState(defaultImageTapeStyle);

    useEffect(() => {
        let tail: ImageNode = infoList.getHead() as ImageNode;
        let visibleContainerHeight = 0;

        for (let i = 0; i < visibleElements; i++) {
            if (!tail.getValue()) {
                break;
            }
            visibleContainerHeight += getHeightFromNode(tail);
            tail = tail.getNext() as ImageNode;
        }

        const listHeight = infoList
            .mapToArray<number>(image => Number(image.images.fixed_width_downsampled.height))
            .reduce((acc, height) => acc += height, 0);

        setImageTapeStyle({
            paddingTop: 0,
            paddingBottom: listHeight - visibleContainerHeight,
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

                    const topNodeHeight = getHeightFromNode(visibleList.getHead());
                    const bottomNodeHeight = getHeightFromNode(shiftedList.getTail());
                
                    let paddingBottom = imageTapeStyle.paddingBottom as number - bottomNodeHeight;
                    const paddingTop = imageTapeStyle.paddingTop as number + topNodeHeight;

                    if (paddingBottom < thresholdToSwapImages) {
                        if (appRoachingBottomNotifyer) {
                            appRoachingBottomNotifyer();
                            // TODO the padding should be adjasted when we get actual data an know the size of new elements
                            paddingBottom += defaultPaddingOnNewData;
                        }
                    }

                    setImageTapeStyle({
                        paddingBottom: paddingBottom,
                        paddingTop: paddingTop,
                    });

                } else if (containerPosition.top + thresholdToSwapImages - 100 >= 0) {
                    const shiftedList = visibleList.shiftList(shiftLeft);

                    if (shiftedList === visibleList) {
                        return;
                    }

                    setVisibleList(shiftedList);

                    const topNodeHeight = getHeightFromNode(shiftedList.getHead());
                    const bottomNodeHeight = getHeightFromNode(visibleList.getTail());

                    const paddingBottom = imageTapeStyle.paddingBottom as number + bottomNodeHeight;
                    const paddingTop = imageTapeStyle.paddingTop as number - topNodeHeight;

                    setImageTapeStyle({
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
    });

    return {
        visibleList: visibleList,
        imageTapeStyle: imageTapeStyle,
    };

}
