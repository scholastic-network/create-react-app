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
import {ModalParams} from "../../lib/routing"
import {useSearchParams} from "../../hooks/search/useSearchParams"

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
        const {
            location: {origin},
        } = window
        window.open(`${origin}/users/profile?view_user=${authId}`, "_blank")
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

    const {
        [ModalParams.Support]: {setValue: setSupport},
    } = useSearchParams(ModalParams.Support)

    const supportItems = [
        {
            id: 0,
            text: "Submit support request",
            onClick: () => setSupport("create"),
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
            supportItems={supportItems}
            portalsMenu={{
                portals: availablePortals,
                currentPortal: Portal.Portal,
                subRoutes: true,
            }}
        />
    )
}
