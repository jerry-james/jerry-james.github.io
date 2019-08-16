import { combineReducers, Action} from "redux";
import {State} from "./State";
import {styleReducer} from "./Style";


export const rootReducer = combineReducers(
    {
        style: styleReducer
    });
