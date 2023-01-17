import {Store} from "redux"

declare global {
    interface Window {
        IS_PLAYWRIGHT: boolean
        store: Store
    }
}
