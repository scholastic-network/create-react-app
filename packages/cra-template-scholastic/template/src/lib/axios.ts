import {GenericAPIRequest, getCallAPI} from "scholastic-client-components"
import {RootState} from "../store/rootReducer"

export const callAPI = getCallAPI<RootState>()

export type APIRequest<Req = null, Res = null> = GenericAPIRequest<RootState, Req, Res>
