import { ThunkDispatch } from "redux-thunk";
import { IStore } from "../store/IStore";
import { IAction } from "./IAction";

export type Dispatch = ThunkDispatch<IStore, undefined, IAction>;
