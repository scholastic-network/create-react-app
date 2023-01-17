import {Authorities} from "../../../scholastic-client-components/src/types/securityTypes"
import {AppPaths} from "../lib/routing"

export const routesAccessRestrictions = {
    [AppPaths.SchoolLicenses]: [Authorities.admins.master],
    [AppPaths.BusinessLicenses]: [Authorities.admins.master],
}
