import React from "react"
import {authSelectors, Page403, Authority} from "scholastic-client-components"
import {Redirect, Route} from "react-router-dom"
import {RouteProps} from "react-router"
import {createSelector} from "@reduxjs/toolkit"
import {useSelector} from "react-redux"

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
    const {pageAccessAllowed, portalAccessAllowed} = useSelector(
        selectUserHasAuthorities(authorities)
    )

    return (
        <Route
            {...rest}
            render={(props) =>
                !portalAccessAllowed ? (
                    <Redirect to={"/no_access"} />
                ) : !pageAccessAllowed ? (
                    <Page403 />
                ) : (
                    <Component {...props} />
                )
            }
        />
    )
}
