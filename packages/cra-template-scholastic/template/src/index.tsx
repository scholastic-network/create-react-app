import React, {useEffect} from "react"
import {createRoot} from "react-dom/client"
import {Route, Router} from "react-router-dom"
import {history} from "./lib/routing"
import {store} from "./store/store"
import {Provider, useDispatch, useSelector} from "react-redux"
import {
    authSelectors,
    AuthWrap,
    BottomRightCornerBox,
    configureAxios,
    GuideTour,
    MobileProvider,
    Portal,
    SocketWrapper,
    useAuth,
    useLogout,
    useUpdateMessage,
    BugsnagErrorBoundaryWrapper,
} from "scholastic-client-components"
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

    const logout = useLogout({useDispatch, api: authAPI})
    const accessAllowed = useSelector(authSelectors.getAccessAllowed)

    useEffect(() => {
        // TODO: Change Portal
        configureAxios({store, history, portal: Portal.UNKNOWN, logout})
    }, [logout])

    // TODO: Change Portal
    useUpdateMessage(dispatch, "/admin/index.html")

    // TODO: Change Portal
    const auth = useAuth(Portal.UNKNOWN, dispatch, useSelector, authAPI)

    return (
        <AuthWrap {...auth}>
            <MobileProvider collapseHeaderLeftPartMinimumWidthRem={93}>
                {accessAllowed !== undefined && <Route path="/" component={AppSocketConnected} />}
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

if (window.IS_PLAYWRIGHT) {
    window.store = store
}

render()