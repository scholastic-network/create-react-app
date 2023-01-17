import {combineReducers} from "redux"
import {reducer as formReducer} from "redux-form"
import {authSlice} from "scholastic-client-components/src/slices/authSlice"
import {commonDataSlice} from "scholastic-client-components/src/slices/commonDataSlice"
import {guideTourSlice} from "scholastic-client-components/src/slices/guideTourSlice"
import {headerAlertsSlice} from "scholastic-client-components/src/slices/headerAlertsSlice"
import {headerNotificationsSlice} from "scholastic-client-components/src/slices/headerNotificationsSlice"
import {notificationListSlice} from "scholastic-client-components/src/slices/notificationListSlice"
import {uploadFilesSlice} from "scholastic-client-components/src/slices/uploadFilesSlice"
import {userGuideSlice} from "scholastic-client-components/src/slices/userGuideSlice"
import {userSupportRequestsSlice} from "scholastic-client-components/src/slices/userSupportRequestsSlice"

export const rootReducer = combineReducers({
    form: formReducer,
    auth: authSlice.reducer,
    headerAlerts: headerAlertsSlice.reducer,
    headerNotifications: headerNotificationsSlice.reducer,
    notificationList: notificationListSlice.reducer,
    uploadFiles: uploadFilesSlice.reducer,
    userGuide: userGuideSlice.reducer,
    commonData: commonDataSlice.reducer,
    userSupportRequests: userSupportRequestsSlice.reducer,
    guideTour: guideTourSlice.reducer,
})

export type RootState = ReturnType<typeof rootReducer>
