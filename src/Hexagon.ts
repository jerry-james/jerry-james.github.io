import { Action } from "redux";

export type HexagonState = Hexagon[];

let hexagons : Hexagon[] = [];
let MAX_X1 = 44;
let MAX_X2 = 50;
let pLiving = 0.5;
let pBurning = 0.98;
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

function reset() {
    let h = [];
    for (let i = 0; i < MAX_X1; i++) {
        for (let j = 0; j < MAX_X2; j++) {
            let p = Math.random();
            if (p > pBurning) {
                h[i * MAX_X2 + j] =
                    {
                        x1: i,
                        x2: j,
                        color: [1.0, 0.0, 0.0, 1.0],
                        state: 'BURNING'
                    };
            }
            else if (p > pLiving) {
                h[i * MAX_X2 + j] =
                    {
                        x1: i,
                        x2: j,
                        color: [0.0, 1.0, 0.0, 1.0],
                        state: 'LIVING'
                    };
            } else {
                h[i * MAX_X2 + j] =
                    {
                        x1: i,
                        x2: j,
                        color: [0.3, 0.3, 0.3, 1.0],
                        state: 'DEAD'
                    };
            }
        }
    }
    return h;
}

function step(state: HexagonState) : HexagonState {
    return state;
}

export const hexagonsReducer = (state : HexagonState | undefined = hexagons,
                                action: Action<string>) : HexagonState => {
    if(action.type === 'RESET') {
        return reset();
    } else if(action.type === 'STEP') {
        return step(state);
    } else {
        return state;
    }

}

export interface Hexagon {
    x1 : number;
    x2 : number;
    color: number[];
    state: string;
}