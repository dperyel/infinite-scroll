import { Nullable } from "./types";

type NullableNode<T> = Nullable<Node<T>>;

export class Node<T> {

    protected value: T;
    protected next: NullableNode<T> = null;
    protected prev: NullableNode<T> = null;

    public constructor(value: T) {
        this.value = value;
    }

    public getValue() {
        return this.value;
    }

    public setNext(node: NullableNode<T>) {
        this.next = node;

        return this;
    }

    public getNext() {
        return this.next;
    }

    public setPrev(node: NullableNode<T>) {
        this.prev = node;

        return this;
    }

    public getPrevious() {
        return this.prev;
    }

    public toString(dataReducerFn?: (data: T) => string) {
        const reducer = dataReducerFn ? dataReducerFn : JSON.stringify;
        const left = this.prev ? reducer(this.prev.getValue()) : "null";
        const right = this.next ? reducer(this.next.getValue()) : "null";
        const value = reducer(this.value);

        return `${left} <- ${value} -> ${right}`;
    }

}
