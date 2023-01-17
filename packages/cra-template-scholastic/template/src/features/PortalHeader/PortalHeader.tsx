import React, {memo, useContext, useMemo} from "react"
import {useDispatch, useSelector} from "react-redux"
import {useHistory, useLocation} from "react-router-dom"
import {
    Header,
    HeaderProps,
} from "../../../../scholastic-client-components/src/features/PortalHeader/Header/Header"
import {authAPI} from "../../api/connectedAPI"
import {portalSectionRole} from "../../constants/portalConstants"
import {PortalContext} from "../../context/repositoryContext"
import {useDefaultPortalPath} from "../../hooks/useDefaultPortalPath"
import {AppPaths} from "../../lib/routing"
import {authSelectors} from "../../../../scholastic-client-components/src/slices/authSlice"
import {useLogout} from "../../../../scholastic-client-components/src/hooks/useLogout"
import {Icon} from "../../../../scholastic-client-components/src/ui/Icon/Icon"
import {PortalsPanelItem} from "../../../../scholastic-client-components/src/types/securityTypes"
import {PortalSection} from "../../types/portalSection"
import {useLeftItems} from "./useLeftItems"

export const PortalHeader: React.FC = memo(() => {
    console.log("Header")
    const history = useHistory()
    const {portalSection} = useContext(PortalContext)
    const portalsPanelItems = useSelector(authSelectors.getPortalsPanelItems)
    const logout = useLogout({api: authAPI, useDispatch})
    const leftItems = useLeftItems()
    const {defaultSchoolPath, defaultBusinessPath} = useDefaultPortalPath()

    const portalSections: HeaderProps["portalSections"] = useMemo(
        () =>
            [
                defaultSchoolPath && {
                    id: 0,
                    to: defaultSchoolPath,
                    text: "School portal",
                    active: portalSection === PortalSection.School,
                },
                defaultBusinessPath && {
                    id: 2,
                    to: defaultBusinessPath,
                    text: "Business portal",
                    active: portalSection === PortalSection.Business,
                },
            ].filter(Boolean) as HeaderProps["portalSections"],
        [defaultBusinessPath, defaultSchoolPath, portalSection]
    )

    const logoLink = useMemo(
        () => ({
            logoImage: <Icon name="REPOSITORY" />,
            to:
                portalSection === PortalSection.School && defaultSchoolPath
                    ? defaultSchoolPath
                    : portalSection === PortalSection.Business && defaultBusinessPath
                    ? defaultBusinessPath
                    : "/",
        }),
        [defaultBusinessPath, defaultSchoolPath, portalSection]
    )

    const portalsMenu = useMemo(
        () => ({
            useSelector,
            portals: portalsPanelItems,
            currentPortal: PortalsPanelItem.Settings,
            subRoutes: true,
        }),
        [portalsPanelItems]
    )

    const location = useLocation()

    const page = useMemo(() => {
        const loc = location.pathname.replaceAll("/", "")
        const routes = Object.entries(AppPaths).reduce(
            (routes, [name, path]) => ({
                ...routes,
                [name]: path.replaceAll("/", ""),
            }),
            {} as typeof AppPaths
        )

        let foundLoc
        for (const [, path] of Object.entries(routes).sort((a, b) =>
            a[0].length < b[0].length ? 1 : -1
        )) {
            if (loc.includes(path)) {
                foundLoc = path
                break
            }
        }

        if (foundLoc === routes.SchoolLicenses) return "SETTINGS_SCHOOL_LICENSES"
        if (foundLoc === routes.BusinessLicenses) return "SETTINGS_BUSINESS_LICENSES"

        return loc.toUpperCase()
    }, [location.pathname])

    return (
        <Header
            page={page}
            useDispatch={useDispatch}
            useSelector={useSelector}
            history={history}
            logoLink={logoLink}
            leftItems={leftItems}
            logout={logout}
            portalsMenu={portalsMenu}
            portalSections={portalSections}
            selectedPortalSection={portalSectionRole[portalSection]}
        />
    )
})
