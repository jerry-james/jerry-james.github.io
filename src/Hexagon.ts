import { Action } from "redux";

export type HexagonState = Hexagon[];

export const hexagonsReducer = (state : HexagonState | undefined = [],
                                action: Action<string>) : HexagonState => {
    return state;
}

export class Hexagon {
    private readonly _x1 : number;
    private readonly _x2 : number;
    private _color: number[];

    public get x1(): number {
        return this._x1;
    }

    get x2(): number {
        return this._x2;
    }

    get color(): number[] {
        return this._color;
    }

    constructor(x1 : number, x2 :number, color : number[]) {
        this._x1 = x1;
        this._x2 = x2;
        this._color = color;
    }


}