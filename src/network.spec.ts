import {NetworkFactoryImpl, NetworkInterface} from "./network";

export let nothing  = 0;

describe("network", () => {
    it("does something", () => {
        let factory = new NetworkFactoryImpl();
        // @ts-ignore
        let n0 : Node = factory.makeNode(
            factory.makeInterface(
                factory.makeIdent(10, 1, 1, 1),
                factory.makeAddress(12, 34, 56, 78, 10, 11)));
        // @ts-ignore
        let n1 : Node = factory.makeNode(
            factory.makeInterface(
                factory.makeIdent(10, 1, 1, 2),
                factory.makeAddress(12, 34, 56, 78, 10, 12)));
        // @ts-ignore
        let n2 : Node = factory.makeNode(
            factory.makeInterface(
                factory.makeIdent(10, 1, 2, 1),
                factory.makeAddress(12, 34, 56, 78, 10, 13)));
        // @ts-ignore
        let n3 : Node = factory.makeNode(
            factory.makeInterface(
                factory.makeIdent(10, 1, 2, 2),
                factory.makeAddress(12, 34, 56, 78, 10, 14)));

    })
});