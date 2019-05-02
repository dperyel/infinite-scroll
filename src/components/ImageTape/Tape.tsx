import React from "react";
import { ImageInfoList } from "../../utils/image/ImageInfoList";
import { ImageBlock } from "./ImageBlock";
import "./Tape.css";

export interface TapeProps {
    imageList: ImageInfoList;
    approachingBottomNotifier: () => void;
}

export const Tape: React.FC<TapeProps> = (props) => {

    return (
        <div className="Tape">
            {props.imageList.getSize() === 0
                ? <p>Loading...</p>
                : <ImageBlock {...props} />}
        </div>
    );

}
