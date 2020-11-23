import React from "react"
import {
    authSelectors,
    Page403,
    getAuthLoginRedirectPath,
    PageNoAccess,
    ContainerLayout,
    Loader,
    Authority,
} from "scholastic-client-components"
import {Route} from "react-router-dom"
import {RouteProps} from "react-router"
import {createSelector} from "@reduxjs/toolkit"
import {useSelector} from "react-redux"
import {useLogout} from "../hooks/auth/useLogout"

const selectUserHasAuthorities = (authorities?: Array<Authority>) => {
    return createSelector(
        authSelectors.getUserHasAuthorities(authorities),
        authSelectors.getToken(),
        authSelectors.getAccessAllowed(),
        (pageAccessAllowed, userToken, portalAccessAllowed) => ({
            pageAccessAllowed,
            portalAccessAllowed: portalAccessAllowed,
            isAuthenticated: !!userToken,
        })
    )
}

interface PrivateRouteProps extends RouteProps {
    component: React.ComponentType<any>
    authorities?: Array<Authority>
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
    component: Component,
    authorities,
    ...rest
}) => {
    const {pageAccessAllowed, portalAccessAllowed, isAuthenticated} = useSelector(
        selectUserHasAuthorities(authorities)
    )
    const loginRedirectPath = getAuthLoginRedirectPath(
        window.location.pathname,
        window.location.search
    )

    const homeURL = useSelector(authSelectors.getHomePortalURL())
    const logout = useLogout()

    if (!isAuthenticated) {
        window.location.replace(loginRedirectPath)
        return (
            <ContainerLayout>
                <Loader />
            </ContainerLayout>
        )
    }

    return (
        <Route
            {...rest}
            render={(props) =>
                !portalAccessAllowed ? (
                    <PageNoAccess onLoginProposalClick={logout} homeURL={homeURL} />
                ) : !pageAccessAllowed ? (
                    <Page403 />
                ) : (
                    <Component {...props} />
                )
            }
        />
    )
}
