import { combineReducers } from "redux";

import userReducer, { userState } from "./userReducer";
import utilsReducer, { utilsState } from "./utilsReducer";
import productReducer, {productState} from "./productReducer";
import { ReducerState } from '../../types/reduxTypes'

const rootReducer = combineReducers({ userReducer, utilsReducer, productReducer });

export type Store = ReturnType<typeof rootReducer>

export const initialState: ReducerState = {
	userReducer: userState,
	utilsReducer: utilsState,
	productReducer: productState
  }
  
export default rootReducer;
