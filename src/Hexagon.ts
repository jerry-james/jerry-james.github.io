import { Action } from "redux";

export type HexagonState = Hexagon[];

let hexagons : Hexagon[] = [];
let MAX_X1 = 100;
let MAX_X2 = 100;
let pLiving = 0.60;
let pBurning = 0.999;
let pNew = 0.980;
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
    let h : HexagonState = [];
    for (let i = 0; i < MAX_X1; i++) {
        for (let j = 0; j < MAX_X2; j++) {
            let hprev = state[i * MAX_X2 + j];
            if(hprev.state === 'BURNING') {
                h[i * MAX_X2 + j] = {
                    x1: i, x2: j,
                    color: [0.3, 0.3, 0.3, 1.0],
                    state: 'DEAD'
                };
            } else if(hprev.state === 'DEAD') {


                if(Math.random() > pNew)
                     h[i * MAX_X2 + j] = {
                         x1: i, x2: j,
                         color: [0.0, 1.0, 0.3, 1.0],
                         state: 'LIVING'
                     };
                else
                    h[i * MAX_X2 + j] = {
                        x1: i, x2: j,
                        color: [0.3, 0.3, 0.3, 1.0],
                        state: 'DEAD'
                    };
            } else if(hprev.state === 'LIVING') {
                let n0 = state[(i + 0) * MAX_X2 + (j + 1)];
                let n1 = state[(i + 0) * MAX_X2 + (j - 1)];
                let n2 = state[(i + 1) * MAX_X2 + (j + 0)];
                let n3 = state[(i - 1) * MAX_X2 + (j + 0)];
                let n4 = state[(i + 1) * MAX_X2 + (j + 1)];
                let n5 = state[(i - 1) * MAX_X2 + (j - 1)];
                let nn = [n0,n1,n2,n3,n4,n5];
                let isBurning = nn.filter((value, index) => {
                    if(value)
                        return value.state === 'BURNING';
                    else
                        return false;
                }).length != 0;
                if(isBurning) {
                    h[i * MAX_X2 + j] = {
                        x1: i, x2: j,
                        color: [1.0, 0.0, 0.0, 1.0],
                        state: 'BURNING'
                    };
                } else {
                    h[i * MAX_X2 + j] = {
                        x1: i, x2: j,
                        color: [0.0, 1.0, 0.0, 1.0],
                        state: 'LIVING'
                    };
                }
            }

        }
    }
    return h;
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

};

export interface Hexagon {
    x1 : number;
    x2 : number;
    color: number[];
    state: string;
}