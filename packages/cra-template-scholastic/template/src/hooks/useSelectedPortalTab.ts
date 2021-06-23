import {useMemo} from "react"
import {useHistory} from "react-router-dom"
import {AppPaths} from "../lib/routing"

export const useSelectedPortalTab = () => {
    const history = useHistory()
    return useMemo(
        () =>
            Object.values(AppPaths)
                .find((item) => history.location.pathname.includes(item))
                ?.substring(1) || Object.values(AppPaths)[0].substring(1),
        [history.location.pathname]
    )
}
