import "./stylesheets/index.scss"
import React, {Suspense, useEffect} from "react"
import {PortalHeader} from "./features/PortalHeader/PortalHeader"
import {
    Loader,
    Page403,
    Page404,
    ContainerLayout,
    authSlice,
    PersonPortal,
} from "scholastic-client-components"
import {PrivateRoute} from "./lib/PrivateRoute"
import {Route, Switch} from "react-router-dom"
import {useDispatch} from "react-redux"
import {ExamplePage} from "./pages/ExamplePage"
import browserUpdate from "browser-update"

export const App: React.FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        // http://localhost:3000/screens/#test-bu
        browserUpdate({
            l: "en",
            text: {
                msg: "You are using an old version of your browser ({brow_name}).",
                msgmore:
                    "Please update your browser to use all features of The Scholastic Network.",
            },
            required: {f: 41, c: 69, o: 56},
        })
    }, [])

    useEffect(() => {
        dispatch(authSlice.actions.updateAccessData({currentPortal: PersonPortal.Users}))
    }, [dispatch])

    return (
        <>
            <PortalHeader />
            <Suspense
                fallback={
                    <ContainerLayout>
                        <Loader />
                    </ContainerLayout>
                }
            >
                <Switch>
                    <PrivateRoute path={"/"} component={ExamplePage} roles={[]} exact />
                    <Route path={"/403"} component={Page403} />
                    <Route component={Page404} />
                </Switch>
            </Suspense>
        </>
    )
}
