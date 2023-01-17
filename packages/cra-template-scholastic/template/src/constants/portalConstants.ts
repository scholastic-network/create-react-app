import {AuthPerson} from "../../../scholastic-client-components/src/api/authAPI"
import {PortalSection} from "../types/portalSection"

export const portalSectionRole: {[p in PortalSection]: keyof AuthPerson["roleAuthorities"]} = {
    [PortalSection.School]: "school",
    [PortalSection.Business]: "business",
    [PortalSection.Partner]: "partner",
}
