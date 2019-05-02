import { ImageNode } from "./ImageNode";
import { ImageInfoList } from "./ImageInfoList";
import { VisibleImageList } from "./VisibleImageList";
import { ImageInfo } from "./types";

const mockedImageInfo = (name: string): ImageInfo => ({
    id: name,
    title: name,
    images: {
        fixed_width_still: {
            height: "5",
            url: "test.com",
            width: "10",
        },
        fixed_width_downsampled: {
            height: "5",
            url: "test.com",
            width: "10",
        },
    }
});

describe("VisibleImageList", () => {

    let node1: ImageNode;
    let node2: ImageNode;
    let node3: ImageNode;
    let node4: ImageNode;
    let node5: ImageNode;
    let node6: ImageNode;
    let node7: ImageNode;
    let infoList: ImageInfoList;
    
    beforeEach(() => {
        node1 = new ImageNode(mockedImageInfo("node1"));
        node2 = new ImageNode(mockedImageInfo("node2"));
        node3 = new ImageNode(mockedImageInfo("node3"));
        node4 = new ImageNode(mockedImageInfo("node4"));
        node5 = new ImageNode(mockedImageInfo("node5"));
        node6 = new ImageNode(mockedImageInfo("node6"));
        node7 = new ImageNode(mockedImageInfo("node7"));

        infoList = (new ImageInfoList()).add(node1)
            .add(node2)
            .add(node3)
            .add(node4)
            .add(node5)
            .add(node6)
            .add(node7);
    });

    it("should map image infos to array", () => {
        const list = new VisibleImageList().setHead(node1).setTail(node7);
        const listToArray = list.mapToArray(v => v);

        expect(listToArray.length).toBe(7);
    });

    it("should slice a list", () => {
        const list = new VisibleImageList().setHead(node3).setTail(node5);
        const idList = list.mapToArray(v => v.id);

        expect(idList.length).toBe(3);
    });

    it("should call a callback `list length` times", () => {
        const list = new VisibleImageList().setHead(node1).setTail(node7);
        const spyMapper = jest.fn();
        list.mapToArray(spyMapper);

        expect(spyMapper).toBeCalledTimes(7);
    });

    it("should throw an error that no reference to a tail", () => {
        const list = new VisibleImageList().setHead(node6).setTail(node4);;

        expect(() => {
            list.mapToArray(v => v);
        }).toThrow();
    })

    it("should throw an error when tail stays next to head but as previous value", () => {
        const list = new VisibleImageList().setHead(node6).setTail(node5);

        expect(() => {
            list.mapToArray(v => v);
        }).toThrow();
    })

    it("should shift the list left", () => {
        const list = new VisibleImageList().setHead(node3).setTail(node5);
        const shiftingDirection = (node: ImageNode) => node.getPrevious();

        const newList = list.shiftList(shiftingDirection);

        const head = newList.getHead();
        const tail = newList.getTail();

        expect(head).toBe(node2);
        expect(tail).toBe(node4);
    });

    it("should shift the list 2 nodes tight", () => {
        const list = new VisibleImageList().setHead(node3).setTail(node5);
        const shiftingDirection = (node: ImageNode) => node.getNext()!.getNext();

        const newList = list.shiftList(shiftingDirection);

        const head = newList.getHead();
        const tail = newList.getTail();

        expect(head).toBe(node5);
        expect(tail).toBe(node7);
    });

    it("should ignore shifting", () => {
        const list = new VisibleImageList().setHead(node3).setTail(node5);
        const shiftingDirection = (node: ImageNode) => node.getNext()!.getNext()!.getNext();

        const newList = list.shiftList(shiftingDirection);

        const head = list.getHead();
        const tail = list.getTail();

        expect(newList).toBe(list);
        expect(head).toBe(node3);
        expect(tail).toBe(node5);
    });

});
