import {PortalRoutes} from "../lib/routing"
import {useAvailablePortalPaths} from "./useAvailablePortalPaths"

export const useDefaultPortalPath = () => {
    const availableLibPaths = useAvailablePortalPaths()
    const defaultSchoolPath = Object.values(availableLibPaths.school).filter((item) => !!item)[0]
    const defaultBusinessPath = Object.values(availableLibPaths.business).filter(
        (item) => !!item
    )[0]

    return {
        defaultSchoolPath: defaultSchoolPath ? PortalRoutes.School + defaultSchoolPath : undefined,
        defaultBusinessPath: defaultBusinessPath
            ? PortalRoutes.Business + defaultBusinessPath
            : undefined,
    }
}
