import "./stylesheets/index.scss"
import React, {memo, Suspense} from "react"
import {PortalContext} from "./context/repositoryContext"
import {useDispatch, useSelector} from "react-redux"
import {PortalHeader} from "./features/PortalHeader/PortalHeader"
import {useSearchParams} from "./hooks/search/useSearchParams"
import {AppPrivateRoute} from "./lib/AppPrivateRoute"
import {Redirect, Route, Switch, useHistory} from "react-router-dom"
import {AppPaths, PortalRoutes} from "./lib/routing"
import {ExamplePage} from "./pages/ExamplePage"
import {routesAccessRestrictions} from "./access/routesAccessRestrictions"
import {authAPI} from "./api/connectedAPI"
import {Portal} from "../../scholastic-client-components/src/types/securityTypes"
import {authSelectors} from "../../scholastic-client-components/src/slices/authSlice"
import {useLogout} from "../../scholastic-client-components/src/hooks/useLogout"
import {APIStatus} from "../../scholastic-client-components/src/types/APITypes"
import {ContainerLayout} from "../../scholastic-client-components/src/ui/ContainerLayout/ContainerLayout"
import {ErrorBoundary} from "../../scholastic-client-components/src/features/ErrorBoundary"
import {Loader} from "../../scholastic-client-components/src/ui/Loader/Loader"
import {PageNoAccess} from "../../scholastic-client-components/src/pages/ErrorPage/PageNoAccess"
import {Page403} from "../../scholastic-client-components/src/pages/ErrorPage/page403/Page403"
import {Page404} from "../../scholastic-client-components/src/pages/ErrorPage/page404/Page404"
import {GreetingsModal} from "../../scholastic-client-components/src/modals/GreetingsModal/GreetingsModalLazy"
import {PortalSection} from "./types/portalSection"
import {useDefaultPortalPath} from "./hooks/useDefaultPortalPath"

const BrowserSentinel = React.lazy(() => import("./BrowserSentinel"))

const schoolPortalContextValue = {
    portalSection: PortalSection.School,
}
const businessPortalContextValue = {
    portalSection: PortalSection.Business,
}

export const App: React.FC = () => {
    console.log("App")

    const dispatch = useDispatch()
    const history = useHistory()

    const homeURL = useSelector(authSelectors.getHomePortalURL)
    const logout = useLogout({api: authAPI, useDispatch})

    const logoutInProgress = useSelector(authSelectors.getLogoutStatus) === APIStatus.Loading
    if (logoutInProgress)
        return (
            <ContainerLayout>
                <Loader />
            </ContainerLayout>
        )

    return (
        <ErrorBoundary useSelector={useSelector}>
            <Suspense fallback={null}>
                <BrowserSentinel />
            </Suspense>
            <GreetingsModal
                portal={Portal.Settings}
                useSelector={useSelector}
                dispatch={dispatch}
                appPaths={Object.values(AppPaths)}
                history={history}
            />
            <Switch>
                <AppPrivateRoute path={"/"} component={DefaultPage} exact />

                <AppPrivateRoute path={PortalRoutes.School}>
                    <PortalContext.Provider value={schoolPortalContextValue}>
                        <PortalHeader />
                        <Switch>
                            <AppPrivateRoute
                                path={PortalRoutes.School + AppPaths.SchoolLicenses}
                                component={ExamplePage}
                                authorities={routesAccessRestrictions[AppPaths.SchoolLicenses]}
                            />
                        </Switch>
                        <Modals />
                    </PortalContext.Provider>
                </AppPrivateRoute>

                <AppPrivateRoute path={PortalRoutes.Business} authorities={[]}>
                    <PortalContext.Provider value={businessPortalContextValue}>
                        <PortalHeader />
                        <Switch>
                            <AppPrivateRoute
                                path={PortalRoutes.Business + AppPaths.BusinessLicenses}
                                component={ExamplePage}
                                authorities={routesAccessRestrictions[AppPaths.BusinessLicenses]}
                            />
                        </Switch>
                        <Modals />
                    </PortalContext.Provider>
                </AppPrivateRoute>

                <Route path={"/no_access"}>
                    <PageNoAccess onLoginProposalClick={logout} homeURL={homeURL} />
                </Route>
                <Route path={"/403"} component={Page403} />
                <Route component={Page404} />
            </Switch>
        </ErrorBoundary>
    )
}

const DefaultPage: React.FC = () => {
    const {defaultSchoolPath, defaultBusinessPath} = useDefaultPortalPath()

    const {
        ["article_id"]: {value},
    } = useSearchParams("article_id")
    const search = value ? `&help_center=open&article_id=${value}` : ""

    return <Redirect to={(defaultSchoolPath || defaultBusinessPath || "/403") + search} />
}

const Modals: React.FC = memo(() => {
    return <></>
})
