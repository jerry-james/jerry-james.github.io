import {NavigationState} from "./App";
import {StyleState} from "./Style";
import {Hexagon} from "./Hexagon";

export interface State {
    nav: NavigationState,
    style: StyleState;
    hexagons: Hexagon[]
}