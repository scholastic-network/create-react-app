import {combineReducers} from "redux"
import {authSlice, notificationListSlice, uploadFilesSlice} from "scholastic-client-components"
import {reducer as formReducer} from "redux-form"

export const rootReducer = combineReducers({
    form: formReducer,

    auth: authSlice.reducer,
    notificationList: notificationListSlice.reducer,
    uploadFiles: uploadFilesSlice.reducer,
})

export type RootState = ReturnType<typeof rootReducer>
