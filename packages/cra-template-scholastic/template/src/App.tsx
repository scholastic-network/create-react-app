import "./stylesheets/index.scss"
import React, {Suspense, useEffect} from "react"
import {PortalHeader} from "./features/PortalHeader/PortalHeader"
import {
    Loader,
    Page403,
    Page404,
    ContainerLayout,
    WrappedZendeskModal,
    PageNoAccess,
    authSelectors
} from "scholastic-client-components"
import {useSelector, useDispatch} from "react-redux"
import {PrivateRoute} from "./lib/PrivateRoute"
import {Redirect, Route, Switch} from "react-router-dom"
import {ExamplePage} from "./pages/ExamplePage"
import browserUpdate from "browser-update"
import {AppPaths, ModalParams} from "./lib/routing"
import {useSearchParams} from "./hooks/search/useSearchParams"
import {useLogout} from "./hooks/auth/useLogout"
import {routesAccessRestrictions} from "./access/routesAccessRestrictions"
import intersection from "lodash.intersection"

export const App: React.FC = () => {
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

    const {
        [ModalParams.Support]: {setValue: setSupport, value: supportOpen},
    } = useSearchParams(ModalParams.Support)

    const homeURL = useSelector(authSelectors.getHomePortalURL())
    const logout = useLogout()

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
                    <PrivateRoute path={"/"} component={DefaultPage} authorities={[]} exact />
                    <PrivateRoute
                        path={AppPaths.Example}
                        component={ExamplePage}
                        authorities={routesAccessRestrictions[AppPaths.Example]}
                        exact
                    />
                    <Route path={"/no_access"}>
                        <PageNoAccess onLoginProposalClick={logout} homeURL={homeURL} />
                    </Route>
                    <Route path={"/403"} component={Page403} />
                    <Route component={Page404} />
                </Switch>
                <WrappedZendeskModal
                    useSelector={useSelector}
                    useDispatch={useDispatch}
                    open={!!supportOpen}
                    onClose={() => setSupport(undefined)}
                />
            </Suspense>
        </>
    )
}

const DefaultPage: React.FC = () => {
    const userAuthorities = useSelector(authSelectors.getAuthorities())
    const defaultRoute = Object.entries(routesAccessRestrictions).find(
        ([_, authorities]) => intersection(userAuthorities, authorities).length
    )
    return <Redirect to={defaultRoute?.[0] || "/403"} />
}