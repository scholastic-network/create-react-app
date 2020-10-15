import React from "react"
import {authSelectors, Page403, Role, getLoginRedirectPath} from "scholastic-client-components"
import {Redirect, Route, useLocation} from "react-router-dom"
import {RouteProps} from "react-router"
import {createSelector} from "@reduxjs/toolkit"
import {useSelector} from "react-redux"

const selectUserHasRoles = (roles?: Array<Role>) => {
    return createSelector(
        authSelectors.getUserHasRoles(roles),
        authSelectors.getToken(),
        authSelectors.getAccessAllowed(),
        (userHasRoles, userToken, accessAllowed) => ({
            isAdmitted: userHasRoles && accessAllowed,
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
    const {isAdmitted, isAuthenticated} = useSelector(selectUserHasRoles(roles))

    const location = useLocation()
    const loginRedirectPath = getLoginRedirectPath(location.pathname, location.search)

    return (
        <Route
            {...rest}
            render={(props) => {
                /* if (isAuthenticated) {*/
                return isAdmitted ? <Component {...props} /> : <Page403 />
                /*} else {
                    return <Redirect to={loginRedirectPath} />
                }*/
            }}
        />
    )
}
