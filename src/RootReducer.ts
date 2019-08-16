import { combineReducers} from "redux";
import {styleReducer} from "./Style";
import {navigationReducer} from "./App";


export const rootReducer = combineReducers(
    {
        nav: navigationReducer,
        style: styleReducer
    });
