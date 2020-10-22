import React from "react"
import {
    authSelectors,
    Page403,
    Role,
    getAuthLoginRedirectPath,
    PageNoAccess,
} from "scholastic-client-components"
import {Route} from "react-router-dom"
import {RouteProps} from "react-router"
import {createSelector} from "@reduxjs/toolkit"
import {useSelector} from "react-redux"
import {useLogout} from "../hooks/auth/useLogout"

const selectUserHasRoles = (roles?: Array<Role>) => {
    return createSelector(
        authSelectors.getUserHasRoles(roles),
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
    roles?: Array<Role>
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
    component: Component,
    roles,
    ...rest
}) => {
    const {pageAccessAllowed, portalAccessAllowed, isAuthenticated} = useSelector(
        selectUserHasRoles(roles)
    )
    const loginRedirectPath = getAuthLoginRedirectPath(
        window.location.pathname,
        window.location.search
    )

    if (!isAuthenticated) {
        window.location.replace(loginRedirectPath)
    }

    const homeURL = useSelector(authSelectors.getHomePortalURL())
    const logout = useLogout()

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
