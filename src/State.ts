import * as React from "react";
import {NavigationState} from "./Navigation";

export interface State {
    nav: NavigationState,
    style: {
        navigation: React.CSSProperties,
        main: React.CSSProperties
    };

}