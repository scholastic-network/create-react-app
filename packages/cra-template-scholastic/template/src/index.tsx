import React, {useEffect} from "react"
import {createRoot} from "react-dom/client"
import {Route, Router} from "react-router-dom"
import {history} from "./lib/routing"
import {store} from "./store/store"
import {Provider, useDispatch, useSelector} from "react-redux"
import {AuthWrap} from "../../scholastic-client-components/src/features/AuthWrap/AuthWrap"
import {BottomRightCornerBox} from "../../scholastic-client-components/src/features/BottomRightCornerBox/BottomRightCornerBox"
import {GuideTour} from "../../scholastic-client-components/src/features/GuideTour/GuideTour"
import {MobileProvider} from "../../scholastic-client-components/src/features/MobileContextComponent/MobileContextComponent"
import {SocketWrapper} from "../../scholastic-client-components/src/features/SocketWrapper/SocketWrapperLazy"
import {useLogout} from "../../scholastic-client-components/src/hooks/useLogout"
import {useUpdateMessage} from "../../scholastic-client-components/src/hooks/useUpdateMessage"
import {configureAxios} from "../../scholastic-client-components/src/lib/axios"
import {BugsnagErrorBoundaryWrapper} from "../../scholastic-client-components/src/middlewares/bugsnagErrorBoundaryMiddleware"
import {authSelectors} from "../../scholastic-client-components/src/slices/authSlice"
import {APIStatus} from "../../scholastic-client-components/src/types/APITypes"
import {Portal} from "../../scholastic-client-components/src/types/securityTypes"
import {useAuth} from "../../scholastic-client-components/src/hooks/useAuth"
import ScholasticLoader from "../../scholastic-client-components/src/ui/ScholasticLoader/ScholasticLoader"
import {Notifications} from "./features/Notifications/Notifications"
import {authAPI} from "./api/connectedAPI"

const App = require("./App").App

const AppSocketConnected: React.FC = () => {
    return (
        <SocketWrapper hooks={{useSelector, useDispatch}}>
            <App />
        </SocketWrapper>
    )
}

const AppWrapper: React.FC = () => {
    const dispatch = useDispatch()

    const logout = useLogout({api: authAPI, useDispatch})
    const accessAllowed = useSelector(authSelectors.getAccessAllowed)

    useEffect(() => {
        configureAxios({store, history, portal: Portal.Settings, logout})
    }, [logout])

    const auth = useAuth(Portal.Repository, dispatch, useSelector, authAPI)

    useUpdateMessage(dispatch, "/settings/update.html")

    return (
        <AuthWrap {...auth}>
            <MobileProvider>
                {accessAllowed !== undefined && <Route path="/" component={AppSocketConnected} />}
                {accessAllowed === undefined && auth.status === APIStatus.Success && (
                    <div style={{marginTop: "10rem"}}>
                        <ScholasticLoader />
                    </div>
                )}
                <BottomRightCornerBox
                    guideNode={
                        <GuideTour
                            history={history}
                            useSelector={useSelector}
                            dispatch={dispatch}
                        />
                    }
                    notificationNode={<Notifications />}
                />
            </MobileProvider>
        </AuthWrap>
    )
}

const container = document.getElementById("scholastic-root")
const root = createRoot(container!)

const render = () => {
    root.render(
        <BugsnagErrorBoundaryWrapper>
            <Provider store={store}>
                <Router history={history}>
                    <AppWrapper />
                </Router>
            </Provider>
        </BugsnagErrorBoundaryWrapper>
    )
}

render()

if (window.IS_PLAYWRIGHT) {
    window.store = store
}
