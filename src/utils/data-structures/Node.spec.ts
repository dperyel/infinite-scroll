import { Node } from "./Node";

interface MockDataInterface {
    test: string;
}

describe("Node for a linked list", () => {

    let mockedData: MockDataInterface;

    beforeEach(() => {
        mockedData = {
            test: "test",
        };
    });

    it("should add create a single node", () => {
        const node = new Node<MockDataInterface>(mockedData);
        expect(node.getValue()).toBe(mockedData);
        expect(node.getNext()).toBeNull();
        expect(node.getPrevious()).toBeNull();
    });

    it("should add a next element to a node", () => {
        const nextNode = new Node<MockDataInterface>({
            test: "next",
        });
        const node = new Node<MockDataInterface>(mockedData);
        node.setNext(nextNode);

        expect(node.getValue()).toBe(mockedData);
        expect(node.getNext()).toBe(nextNode);
        expect(node.getPrevious()).toBeNull();
    });

    it("should add a previous element to a node", () => {
        const prevNode = new Node<MockDataInterface>({
            test: "prev",
        });
        const node = new Node<MockDataInterface>(mockedData);
        node.setPrev(prevNode);

        expect(node.getValue()).toBe(mockedData);
        expect(node.getNext()).toBeNull();
        expect(node.getPrevious()).toBe(prevNode);
    });

    it("should return a string", () => {
        const nextNode = new Node<MockDataInterface>({
            test: "next",
        });
        const prevNode = new Node<MockDataInterface>({
            test: "prev",
        });
        const node = new Node<MockDataInterface>(mockedData);
        node.setNext(nextNode).setPrev(prevNode);

        const valueReducer = (value: MockDataInterface) => value.test;

        expect(node.toString(valueReducer)).toBe("prev <- test -> next");
    });

});
