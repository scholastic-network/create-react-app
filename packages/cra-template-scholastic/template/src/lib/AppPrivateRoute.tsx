import React from "react"
import {useSelector} from "react-redux"
import {
    PrivateRoute,
    PrivateRouteProps,
} from "../../../scholastic-client-components/src/features/PrivateRoute"

type AppPrivateRouteProps = Omit<PrivateRouteProps, "useSelector">

export const AppPrivateRoute: React.FC<AppPrivateRouteProps> = (props) => {
    return <PrivateRoute useSelector={useSelector} {...props} />
}
