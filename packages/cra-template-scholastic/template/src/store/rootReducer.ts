import {combineReducers} from "redux"
import {authSlice, notificationListSlice} from "scholastic-client-components"
import {reducer as formReducer} from "redux-form"

const appReducer = combineReducers({
    form: formReducer,

    auth: authSlice.reducer,
    notificationList: notificationListSlice.reducer,
})

export const CLEAR_STORE = "CLEAR_STORE"

export const clearStore = () => ({
    type: CLEAR_STORE,
})

export type AppState = ReturnType<typeof appReducer>
export type RootReducer = (state: AppState | undefined, action: {type: string}) => AppState

export const rootReducer: RootReducer = (state, action) => {
    if (action.type === CLEAR_STORE) {
        return appReducer(undefined, action)
    }

    return appReducer(state, action)
}

export type RootState = ReturnType<typeof rootReducer>
