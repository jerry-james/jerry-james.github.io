import { combineReducers} from "redux";
import {styleReducer} from "./Style";
import {navigationReducer} from "./App";
import {hexagonsReducer} from "./Hexagon";


export const rootReducer = combineReducers(
    {
        nav: navigationReducer,
        style: styleReducer,
        hexagons: hexagonsReducer
    });
