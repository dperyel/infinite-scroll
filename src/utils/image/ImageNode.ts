import { Node } from "../data-structures/Node";
import { ImageInfo } from "./types";

export class ImageNode extends Node<ImageInfo> {

    public constructor(data: ImageInfo) {
        super(data);
    }

}
