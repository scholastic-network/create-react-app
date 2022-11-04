import {getAuthAPI} from "scholastic-client-components"
import {RootState} from "../store/rootReducer"

export const authAPI = getAuthAPI<RootState>()
