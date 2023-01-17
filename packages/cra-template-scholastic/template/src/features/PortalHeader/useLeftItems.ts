import {useMemo} from "react"
import {useLocation} from "react-router-dom"
import {HeaderProps} from "../../../../scholastic-client-components/src/features/PortalHeader/Header/Header"
import {useLicensesPath} from "./useLicensesPath"

export const useLeftItems = () => {
    const location = useLocation()
    const licensesPath = useLicensesPath()

    return useMemo(() => {
        const leftItems: HeaderProps["leftItems"] = []

        if (licensesPath) {
            leftItems.push({
                id: 0,
                text: "Licenses",
                isActive: location.pathname.includes(licensesPath),
                to: licensesPath,
            })
        }

        return leftItems
    }, [licensesPath, location.pathname])
}
