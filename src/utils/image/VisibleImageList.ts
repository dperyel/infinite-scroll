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
     * The list is shifted if no boundaries hited
     * The method return a new instance if the list is shifted and the same reference if nothing changed
     *
     * @param directionFn
     */
    public shiftList(directionFn: (node: ImageNode) => Nullable<ImageNode>) {
        const newHead = this.head && directionFn(this.head);
        const newTail = this.tail && directionFn(this.tail);

        if (newHead && newTail) {
            return new VisibleImageList().setHead(newHead).setTail(newTail);
        }

        return this;
    }

    private validateList() {
        if (!this.head) {
            throw new Error(ErrorMessage.NoHead);
        }

        if (this.head === this.tail) {
            throw new Error(ErrorMessage.SameTail);
        }
    }

}
