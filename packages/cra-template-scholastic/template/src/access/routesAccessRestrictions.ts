import {AppPaths} from "../lib/routing"
import {Authority} from "scholastic-client-components"

export const routesAccessRestrictions = {
    [AppPaths.Example]: [Authority.MasterAdmin],
}
