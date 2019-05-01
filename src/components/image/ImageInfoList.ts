import { DoublyLinkedList } from "../../utils/data-structures/DoublyLinkedList";
import { ImageInfo } from "./types";
import { ImageNode } from "./ImageNode";

/**
 * ImageInfoList created for handling big list of data
 */
export class ImageInfoList extends DoublyLinkedList<ImageInfo, ImageNode> {
    private size = 0;

    public getSize() {
        return this.size;
    }

    public add(node: ImageNode) {
        if (!this.head) {
            this.head = node;
        } else if (this.tail) {
            const tmpTail = this.tail;
            tmpTail.setNext(node);
            this.tail = node;
            this.tail.setPrev(tmpTail);
        } else {
            this.tail = node;
            this.tail.setPrev(this.head);
            this.head.setNext(this.tail);
        }

        this.size += 1;

        return this;
    }
}
