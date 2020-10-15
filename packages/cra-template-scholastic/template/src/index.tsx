import React, {useEffect} from "react"
import ReactDOM from "react-dom"
import {Route, Router} from "react-router-dom"
import {history} from "./lib/routing"
import {store} from "./store/store"
import {Provider} from "react-redux"
import {configureAxios, PortalType} from "scholastic-client-components"
import {Notifications} from "./features/Notifications/Notifications"
import {useAuth} from "./hooks/auth/useAuth"
import {useLogout} from "./hooks/auth/useLogout"

const AppWrapper: React.FC = () => {
    const App = require("./App").App

    const {logout} = useLogout()
    useEffect(() => {
        // TODO: Place suitable PortalType
        configureAxios({store, history, portal: PortalType.Scholastic, logout})
    })
    /*const auth = useAuth()
    useEffect(auth, [auth])*/

    return (
        <>
            <Route path="/" component={App} />
            <Notifications />
        </>
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
