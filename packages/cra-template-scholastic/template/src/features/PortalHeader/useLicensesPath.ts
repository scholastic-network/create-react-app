import {useContext} from "react"
import {PortalContext} from "../../context/repositoryContext"
import {useAvailablePortalPaths} from "../../hooks/useAvailablePortalPaths"
import {AppPaths, PortalRoutes} from "../../lib/routing"
import {PortalSection} from "../../types/portalSection"

export const useLicensesPath = () => {
    const {portalSection} = useContext(PortalContext)
    const availablePortalPaths = useAvailablePortalPaths()

    if (portalSection === PortalSection.School && availablePortalPaths[AppPaths.SchoolLicenses]) {
        return PortalRoutes.School + availablePortalPaths[AppPaths.SchoolLicenses]
    }

    if (
        portalSection === PortalSection.Business &&
        availablePortalPaths[AppPaths.BusinessLicenses]
    ) {
        return PortalRoutes.School + availablePortalPaths[AppPaths.SchoolLicenses]
    }
}
