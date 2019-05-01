import { ImageNode } from "./ImageNode";
import { ImageInfoList } from "./ImageInfoList";

describe("ImageInfoList", () => {

    let node1: ImageNode;
    let node2: ImageNode;
    let node3: ImageNode;

    beforeEach(() => {
        node1 = new ImageNode({ id: "node1" });
        node2 = new ImageNode({ id: "node2" });
        node3 = new ImageNode({ id: "node3" });
    });

    it("should contain only a head node", () => {
        const list = new ImageInfoList();
        list.add(node1);

        expect(list.getHead()).toBe(node1);
        expect(list.getTail()).toBeNull();
        expect(list.getSize()).toBe(1);
    });

    it("should contain 2 nodes with correct links", () => {
        const list = new ImageInfoList();
        list.add(node1).add(node2);

        expect(list.getSize()).toBe(2);
        expect(node1.getNext()).toBe(node2);
        expect(node2.getPrevious()).toBe(node1);
    });

    it("should contain 3 nodes", () => {
        const list = new ImageInfoList();
        list.add(node1)
            .add(node2)
            .add(node3);

        expect(list.getSize()).toBe(3);
        expect(list.getHead()).toBe(node1);
        expect(list.getTail()).toBe(node3);

        expect(list.toString(v => v.id)).toBe("node1 -> node2 -> node3");
    });

    it("should map the last element", () => {
        const list = new ImageInfoList();
        list.add(node1);

        expect(list.toString(v => v.id)).toBe("node1");
    });

    it("should have empty nodes", () => {
        const list = new ImageInfoList();

        expect(list.toString(v => v.id)).toBe("");
    });
    
});
