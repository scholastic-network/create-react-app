import {getAuthAPI} from "scholastic-client-components/src/api/authAPI";
import {RootState} from "../store/rootReducer"

export const authAPI = getAuthAPI<RootState>()
