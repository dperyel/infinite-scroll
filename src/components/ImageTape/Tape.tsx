import React, { useState, useEffect } from "react";
import { ImageInfoList } from "../../utils/image/ImageInfoList";
import { ImageNode } from "../../utils/image/ImageNode";
import { ImageBlock } from "./ImageBlock";

export const Tape: React.FC = () => {

    const [imageList, setImageList] = useState(new ImageInfoList());

    useEffect(() => {
        console.log("Called");
        const list = new ImageInfoList();
        for(let i = 0; i < 1000; i++) {
            const imageNode = new ImageNode({
                id: `id_${i}`,
            });
            list.add(imageNode);
        }

        setImageList(list);
    }, []);



    return (<div>
        {imageList.getSize() === 0 ? <p>Loading...</p> : <ImageBlock infoList={imageList} />}
    </div>);

}
