import { toUrl } from "./requestUtils";

describe("requestUtils", () => {

    it("should make assemble a correct url", () => {
        const url = toUrl("http://test.com", {
            test1: "test1",
            test2: 5,
            test3: " some search     ",
        });

        expect(url).toBe("http://test.com?test1=test1&test2=5&test3=some%20search");
    });

    it("should contain only a host data", () => {
        const url1 = toUrl("http://test.com");
        const url2 = toUrl("http://test.com", {});

        expect(url1).toBe("http://test.com");
        expect(url2).toBe("http://test.com");
    });

});
