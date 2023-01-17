import React, {useContext} from "react"
import {PortalSection} from "../types/portalSection"

export const PortalContext = React.createContext<{
    portalSection: PortalSection
}>({portalSection: PortalSection.School})

export const usePortalContext = () => useContext(PortalContext)
