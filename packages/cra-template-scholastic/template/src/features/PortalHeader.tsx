import React from "react"
import {
    authSelectors,
    Header,
    HeaderPopupItemProps,
    NavigationLinkProps,
    PersonPortal,
    Role,
} from "scholastic-client-components"
import {useLocation} from "react-router-dom"
import {useSelector} from "react-redux"
import {useLogout} from "../hooks/auth/useLogout"
import {intersection} from "lodash"

type AccessRestrictions = {
    Roles?: Array<Role>
}

export const PortalHeader: React.FC = () => {
    const userRoles = useSelector(authSelectors.getRoles())
    const filterAccessibleOnly = (items: Array<AccessRestrictions>) =>
        items.filter((item) => (item.Roles ? !!intersection(userRoles, item.Roles).length : true))

    const authId = useSelector(authSelectors.getAuthedUserId())
    const personPortals = useSelector(authSelectors.getPortals())
    const availablePortals = personPortals?.filter((portal) => portal !== PersonPortal.Party)

    const location = useLocation()
    const {logout} = useLogout()

    const leftItems = [
        {
            id: 0,
            text: "Link 1",
            isActive: location.pathname.includes("/link"),
            to: "/link",
            Roles: [Role.Admin],
        },
    ]

    const handleProfileClick = () => {
        // TODO: Open profile edit modal
        console.log("Profile: " + authId)
    }

    const userItems: Array<HeaderPopupItemProps & AccessRestrictions> = [
        {
            id: 0,
            text: "Profile",
            onClick: handleProfileClick,
        },
        {
            id: 1,
            text: "Logout",
            onClick: logout,
        },
    ]

    const accessedLeftItems = filterAccessibleOnly(leftItems) as Array<NavigationLinkProps>
    const accessedUserItems = filterAccessibleOnly(userItems) as Array<HeaderPopupItemProps>

    // TODO: Put suitable currentPortal value
    return (
        <Header
            logoLink={{
                logoImage: <img src="/graphics/logo.svg" alt="" />,
                to: "/",
            }}
            leftItems={accessedLeftItems}
            userItems={accessedUserItems}
            portalsMenu={{portals: availablePortals, currentPortal: PersonPortal.Scholastic}}
        />
    )
}
