import React, { useEffect, useState } from "react";
import { ImageInfoList } from "../../utils/image/ImageInfoList";
import { ImageNode } from "../../utils/image/ImageNode";
import { TapeProps } from "../ImageTape/Tape";
import { RequestStrategy } from "../../utils/request/types";

interface WithLoadedDataProps {
    query: string;
}

/**
 * Current HOC gets data from server and set them into a child component
 *
 * TODO It should get a API type as a second parameter to know which API to trigger
 *
 * @param Component 
 */
export function withLoadedData(Component: React.FC<TapeProps>, apiStrategy: RequestStrategy): React.FC<WithLoadedDataProps> {
    return function WithLoadedData({ query }) {

        const [imageList, setImageList] = useState(new ImageInfoList());
        const [approachingBottom, setApproachingBottom] = useState(false);
        const [paginationData, setPaginationData] = useState();

        useEffect(() => {
            const abortRequestController = new AbortController();

            apiStrategy.search(query, abortRequestController.signal)
                .then(({ data, pagination }) => {
                    setPaginationData(pagination);
                    const list = new ImageInfoList();

                    for (let i = 0; i < data.length; i++) {
                        const imageInfo = data[i];
                        const imageNode = new ImageNode(imageInfo);
                        list.add(imageNode);
                    }

                    setImageList(list);
                });

            return () => {
                abortRequestController.abort();
            }
        }, [query]);

        useEffect(() => {
            if (approachingBottom) {
                const abortRequestController = new AbortController();
                const offset = paginationData.offset + paginationData.count;
                apiStrategy.search(query, abortRequestController.signal, offset)
                    .then(({ data, pagination }) => {
                        setApproachingBottom(false);
                        setPaginationData(pagination);

                        // let adjustedHeight = 0;

                        for (let i = 0; i < data.length; i++) {
                            const imageInfo = data[i];
                            const imageNode = new ImageNode(imageInfo);
                            imageList.add(imageNode);

                            // TODO notify useScroll with this value to adjust scroll
                            // adjustedHeight += Number(imageInfo.images.fixed_width_downsampled.height);
                        }
                    });

                return () => {
                    abortRequestController.abort();
                } 
            }
        });

        const onDataShouldBeLoaded = () => {
            if (!approachingBottom) {
                setApproachingBottom(true);
            }
        }

        return (
            <Component
                imageList={imageList}
                approachingBottomNotifier={onDataShouldBeLoaded} />
        );

    }
}
