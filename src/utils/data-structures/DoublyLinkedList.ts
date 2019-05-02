import { Node } from "./Node";
import { Nullable } from "./types";

enum ErrorMessage {
    CorruptedList = "Tail stays either out of the list or left to head",
}

export class DoublyLinkedList<T, G extends Node<T>> {

    protected head: Nullable<G>;
    protected tail: Nullable<G>;

    public constructor() {
        this.head = null;
        this.tail = null;
    }

    public setHead(head: G) {
        this.head = head;

        return this;
    }

    public getHead() {
        return this.head;
    }

    public setTail(tail: G) {
        this.tail = tail;

        return this;
    }

    public getTail() {
        return this.tail;
    }

    public mapToArray<K>(fn: (data: any) => K): K[] {
        const result: K[] = [];

        if (!this.head) {
            return result;
        }

        if (this.tail && this.head === this.tail.getNext()) {
            throw new Error(ErrorMessage.CorruptedList);
        }

        let currentNode: Nullable<Node<T>> = this.head;
        const iterateTo = this.tail ? this.tail.getNext() : null;
    
        while(currentNode !== iterateTo) {
            if (!currentNode) {
                throw new Error(ErrorMessage.CorruptedList);
            }

            const mappedValue = fn(currentNode.getValue());
            result.push(mappedValue);

            currentNode = currentNode.getNext();
        }
    
        return result;
    }

    public toString(dataReducerFn?: (data: T) => string) {
        const reducer = dataReducerFn
            ? dataReducerFn
            : (value: T) => JSON.stringify(value);

        const result = this.mapToArray<string>(reducer);

        return result.join(" -> ");
    }

}
