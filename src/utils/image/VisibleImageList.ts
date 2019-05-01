import { DoublyLinkedList } from "../data-structures/DoublyLinkedList";
import { ImageNode } from "./ImageNode";
import { ImageInfo, ErrorMessage } from "./types";
import { Nullable } from "../data-structures/types";

/**
 * VisibleImageList is created for getting a slice of images which should be rendered
 * on a screen.
 * Important! Current data structure is differ from doubly linked list as `head` node might
 * contain a refference to a `previous` node as well as `tail` node can have a link to the
 * `next` node.
 * This allow easely shift the list up or down by changing only 2 refferences.
 */
export class VisibleImageList extends DoublyLinkedList<ImageInfo, ImageNode> {

    public constructor(head: ImageNode, tail: ImageNode) {
        super();

        if (!head) {
            throw new Error(ErrorMessage.NoHead);
        }

        if (head === tail) {
            throw new Error(ErrorMessage.SameTail);
        }

        this.head = head;
        this.tail = tail;
    }

    public setHead(head: ImageNode) {
        this.head = head;

        return this;
    }

    public setTail(tail: ImageNode) {
        this.tail = tail;

        return this;
    }

    /**
     * Shifts the Visible list to a provided direction
     * The list is shifted if no boundaries hired
     *
     * @param directionFn
     */
    public shiftList(directionFn: (node: ImageNode) => Nullable<ImageNode>) {
        const newHead = this.head && directionFn(this.head);
        const newTail = this.tail && directionFn(this.tail);

        if (newHead && newTail) {
            this.head = newHead;
            this.tail = newTail;
        }
    }

}
