import {useDispatch} from "react-redux"
import {clearAuthedState} from "scholastic-client-components"
import {useCallback} from "react"
import {authAPI} from "../../api/connectedAPI"

export const useLogout = () => {
    const dispatch = useDispatch()

    return useCallback(() => {
        clearAuthedState()
        dispatch(authAPI.logout({}))
        window.location.replace("/auth")
    }, [dispatch])
}
