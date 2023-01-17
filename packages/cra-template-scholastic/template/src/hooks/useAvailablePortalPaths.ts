import {useMemo} from "react"
import {authSelectors} from "../../../scholastic-client-components/src/slices/authSlice"
import {routesAccessRestrictions} from "../access/routesAccessRestrictions"
import {AppPaths} from "../lib/routing"
import {RootState} from "../store/rootReducer"
import {useAppSelector} from "./useAppSelector"

export const useAvailablePortalPaths = () => {
    // School

    const schoolLicenses = useAppSelector((store: RootState) =>
        authSelectors.getUserHasRoleAuthorities(
            store,
            "school",
            routesAccessRestrictions[AppPaths.SchoolLicenses]
        )
    )

    // Business

    const businessLicenses = useAppSelector((store: RootState) =>
        authSelectors.getUserHasRoleAuthorities(
            store,
            "business",
            routesAccessRestrictions[AppPaths.BusinessLicenses]
        )
    )

    return useMemo(
        () => ({
            school: {
                [AppPaths.SchoolLicenses]: schoolLicenses ? AppPaths.SchoolLicenses : undefined,
            },
            business: {
                [AppPaths.BusinessLicenses]: businessLicenses
                    ? AppPaths.BusinessLicenses
                    : undefined,
            },
        }),
        [businessLicenses, schoolLicenses]
    )
}
