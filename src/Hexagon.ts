import { Action } from "redux";

export type HexagonState = Hexagon[];

let hexagons : Hexagon[] = [];
let MAX_X1 = 44;
let MAX_X2 = 50;
for(let i = 0; i < MAX_X1; i++)  {
    for(let j = 0; j < MAX_X2; j++)
        hexagons[i * MAX_X2 + j] =
            {
                x1: i,
                x2: j,
                color: [Math.random(), Math.random(), Math.random(), 1.0],
                state: 'BURNING'
            };
}

export const hexagonsReducer = (state : HexagonState | undefined = hexagons,
                                action: Action<string>) : HexagonState => {
    return state;
}

export interface Hexagon {
    x1 : number;
    x2 : number;
    color: number[];
    state: string;
}