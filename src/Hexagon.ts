import { Action } from "redux";

export type HexagonState = Hexagon[];

export const hexagonsReducer = (state : HexagonState | undefined = [],
                                action: Action<string>) : HexagonState => {
    return state;
}

export interface Hexagon {
    x1 : number;
    x2 : number;
    color: number[];
    state: string;
}