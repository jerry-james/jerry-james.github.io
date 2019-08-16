import { combineReducers, Action} from "redux";
import {styleReducer} from "./Style";
import {navigationReducer} from "./Navigation";


export const rootReducer = combineReducers(
    {
        nav: navigationReducer,
        style: styleReducer
    });
