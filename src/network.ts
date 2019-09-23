export interface NetworkFactory {
    
}

export interface NetworkBuilder {

    buildIdent(size: number, network: number, subnet: number, system: number): number;


    buildNode(): number;
}

class AddressImpl implements Address {
    get hardware(): number[] {
        return this._hardware;
    }

    constructor(a0: number, a1: number, a2: number, a3: number, a4: number, a5: number) {
        this.a0 = a0;
        this.a1 = a1;
        this.a2 = a2;
        this.a3 = a3;
        this.a4 = a4;
        this.a5 = a5;
        this._hardware = [a0,a1,a2,a3,a4,a5];

    }

    private readonly _hardware: number[];
    private a0: number;
    private a1: number;
    private a2: number;
    private a3: number;
    private a4: number;
    private a5: number;

}

class InterfaceImpl implements NetworkInterface{
    get ident(): Ident {
        return this._ident;
    }
    get address(): Address {
        return this._address;
    }
    constructor(id0: Ident, ad0: Address) {
        this._address = ad0;
        this._ident = id0;

    }

    private _address: Address;
    private _ident: Ident;

}

export class NetworkFactoryImpl implements NetworkFactory {

    makeIdent(size: number, 
              network: number, 
              subnet: number, 
              system: number) : Ident {
        return new IdentImpl(size, network, subnet, system);
    }

    makeAddress(a0: number, a1: number, a2: number,
                a3: number, a4: number, a5: number) : Address {
        return new AddressImpl(a0,a1,a2,a3,a4,a5);
    }

    makeInterface(id0: Ident, ad0: Address) {
        return new InterfaceImpl(id0, ad0);
    }

    makeNode(ni0: NetworkInterface) {
        return undefined;
    }
}

export interface Network {

}

export interface Node {

}

export interface Switch {

}

export interface Router {

}

export interface NetworkInterface {
    address: Address;
    ident: Ident;
}
// Logical Address
export interface Ident {
    size: number;
    network: number;
    subnet: number;
    system: number;
}

class IdentImpl implements Ident {
    constructor(network: number, size: number, subnet: number, system: number) {
        this._network = network;
        this._size = size;
        this._subnet = subnet;
        this._system = system;
    }
    get system(): number {
        return this._system;
    }
    get subnet(): number {
        return this._subnet;
    }
    get size(): number {
        return this._size;
    }
    get network(): number {
        return this._network;
    }
    private readonly _network: number;
    private readonly _size: number;
    private readonly _subnet: number;
    private readonly _system: number;
    
    
}

// Hardware Address
export interface Address {
    hardware: number[];
}