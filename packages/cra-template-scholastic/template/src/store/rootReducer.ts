import {combineReducers} from "redux"
import {authSlice, notificationListSlice} from "scholastic-client-components"
import {reducer as formReducer} from "redux-form"

export const rootReducer = combineReducers({
    form: formReducer,

    auth: authSlice.reducer,
    notificationList: notificationListSlice.reducer,
})

export type RootState = ReturnType<typeof rootReducer>
