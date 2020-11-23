import React from "react"
import {
    authSelectors,
    Header,
    HeaderPopupItemProps,
    NavigationLinkProps,
    Authority,
    Portal,
} from "scholastic-client-components"
import {useLocation} from "react-router-dom"
import {useSelector} from "react-redux"
import {useLogout} from "../../hooks/auth/useLogout"
import intersection from "lodash.intersection"

export type AccessRestrictions = {
    authorities?: Array<Authority>
}

export const PortalHeader: React.FC = () => {
    const userAuthorities = useSelector(authSelectors.getAuthorities())
    const filterAccessibleOnly = (items: Array<AccessRestrictions>) =>
        items.filter((item) =>
            item.authorities ? !!intersection(userAuthorities, item.authorities).length : true
        )

    const authId = useSelector(authSelectors.getAuthedUserId())
    const personPortals = useSelector(authSelectors.getPortals())
    // TODO: Change Portal
    const availablePortals = personPortals?.filter((portal) => portal !== Portal.Portal)

    const location = useLocation()
    const logout = useLogout()

    const leftItems: Array<NavigationLinkProps & AccessRestrictions> = [
        {
            id: 0,
            text: "Link 1",
            isActive: location.pathname.includes("/link"),
            to: "/link",
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

    // TODO: Change Portal
    return (
        <Header
            logoLink={{
                logoImage: <img src={"graphics/Logo.svg"} alt="" />,
                to: "/",
            }}
            leftItems={accessedLeftItems}
            userItems={accessedUserItems}
            portalsMenu={{
                portals: availablePortals,
                currentPortal: Portal.Portal,
                subRoutes: true,
            }}
        />
    )
}
