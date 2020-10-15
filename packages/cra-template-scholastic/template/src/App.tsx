import "./stylesheets/index.scss"
import React, {Suspense, useEffect} from "react"
import {PortalHeader} from "./features/PortalHeader/PortalHeader"
import {
    APIStatus,
    authSelectors,
    ContainerLayout,
    ErrorAlert,
    Loader,
    Page403,
    Page404,
    PageNoAccess,
} from "scholastic-client-components"
import {PrivateRoute} from "./lib/PrivateRoute"
import {Route, Switch} from "react-router-dom"
import {useSelector} from "react-redux"
import {useLogout} from "./hooks/auth/useLogout"
import {ExamplePage} from "./pages/ExamplePage"
import browserUpdate from "browser-update"

export const App: React.FC = () => {
    const {logout} = useLogout()

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

    const authStatus = useSelector(authSelectors.getAuthStatus())
    const logoutStatus = useSelector(authSelectors.getLogoutStatus())
    const homeURL = useSelector(authSelectors.getHomePortalURL())

    /*    if (authStatus !== APIStatus.Success || logoutStatus === APIStatus.Loading) {
        return (
            <ContainerLayout>
                {authStatus === APIStatus.Failure ? <ErrorAlert /> : <Loader />}
            </ContainerLayout>
        )
    }*/

    return (
        <>
            <PortalHeader />
            <Suspense fallback={<Loader />}>
                <Switch>
                    {/*<PrivateRoute path={"/"} component={ExamplePage} exact />*/}
                    <Route path={"/"} exact>
                        <ExamplePage />
                    </Route>
                    <Route path={"/no_access"}>
                        <PageNoAccess onLoginProposalClick={logout} homeURL={homeURL} />
                    </Route>
                    <Route path={"/403"} component={Page403} />
                    <Route component={Page404} />
                </Switch>
            </Suspense>
        </>
    )
}
