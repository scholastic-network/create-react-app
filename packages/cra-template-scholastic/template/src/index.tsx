import React, {useEffect} from "react"
import ReactDOM from "react-dom"
import {Route, Router} from "react-router-dom"
import {history} from "./lib/routing"
import {store} from "./store/store"
import {Provider, useDispatch, useSelector} from "react-redux"
import {
    configureAxios,
    authSelectors,
    Portal,
    AuthWrap,
    useAuth,
    UserGuide,
} from "scholastic-client-components"
import {Notifications} from "./features/Notifications/Notifications"
import {useLogout} from "./hooks/auth/useLogout"
import {authAPI} from "./api/connectedAPI"
import {useSelectedPortalTab} from "./hooks/useSelectedPortalTab"

const App = require("./App").App
const AppWrapper: React.FC = () => {
    const dispatch = useDispatch()

    const logout = useLogout()
    const accessAllowed = useSelector(authSelectors.getAccessAllowed())

    useEffect(() => {
        // TODO: Change Portal
        configureAxios({store, history, portal: Portal.UNKNOWN, logout})
    }, [logout])

    // TODO: Change Portal
    const auth = useAuth(Portal.UNKNOWN, dispatch, useSelector, authAPI)
    const selectedTab = useSelectedPortalTab()

    return (
        <AuthWrap {...auth}>
            {accessAllowed !== undefined && <Route path="/" component={App} />}
            <Notifications />
            <UserGuide
                tab={selectedTab}
                useSelector={useSelector}
                dispatch={dispatch}
                portal={Portal.Admin}
            />
        </AuthWrap>
    )
}

const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <Router history={history}>
                <AppWrapper />
            </Router>
        </Provider>,
        document.getElementById("scholastic-root")
    )
}

render()

if (process.env.NODE_ENV === "development" && module.hot) {
    module.hot.accept("./App", render)
}
