import * as React from "react";
import { Action } from "redux";

export type StyleState = {
    navigation: React.CSSProperties;
    main: React.CSSProperties
};

export const styleReducer = (state: StyleState | undefined = getStyle(150),
                             action: Action) => state;

export function getStyle(marginLeft: number): StyleState {
    return {
        navigation: {
            position: "fixed",
            zIndex: 1000,
            top: "0",
            left: "0",
            width: marginLeft
        },
        main: {
            marginLeft: marginLeft + 10
        }
    };
}