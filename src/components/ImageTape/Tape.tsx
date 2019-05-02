import React, { useState, useEffect } from "react";
import { ImageInfoList } from "../../utils/image/ImageInfoList";
import { ImageNode } from "../../utils/image/ImageNode";
import { ImageBlock } from "./ImageBlock";
import { toUrl } from "../../utils/requestUtils";
import { GiphyDataResponse } from "../../utils/image/types";

export const Tape: React.FC = () => {

    const [imageList, setImageList] = useState(new ImageInfoList());
    const [totalImageHeight, setTotalImageHeight] = useState(0);

    useEffect(() => {
        // TODO get this data from context API to avoid child component re-renders
        const list = new ImageInfoList();

        const url = toUrl("https://api.giphy.com/v1/gifs/search", {
            api_key: "",
            q: "kittens",
            limit: 100,
            offset: 0,
            rating: "G",
            lang: "en",
        });

        const getGiphies = async () => {
            const res = await fetch(url);
            const body: GiphyDataResponse = await res.json();
            
            if (body.meta.status === 200) {
                const data = body.data;
                let totalHeight = 0;
                for (let i = 0; i < data.length; i++) {
                    const imageInfo = data[i];
                    const imageNode = new ImageNode(imageInfo);
                    list.add(imageNode);

                    const imageHeight = +imageInfo.images.fixed_width_downsampled.height;
                    totalHeight += imageHeight;
                }

                setTotalImageHeight(totalHeight);
                console.log(totalHeight);
                setImageList(list);
            } else {
                //TODO check an error
            }
        }

        // TODO abort the request on unmount
        getGiphies();
    }, []);

    return (<div>
        {imageList.getSize() === 0
            ? <p>Loading...</p>
            : <ImageBlock infoList={imageList} totalImageHeight={totalImageHeight} />}
    </div>);

}
