import {useDispatch} from "react-redux"
import {useCallback} from "react"
import {authAPI} from "../../api/connectedAPI"

export const useLogout = () => {
    const dispatch = useDispatch()

    return useCallback(() => {
        dispatch(authAPI.logout({}))
        window.location.replace("/auth")
    }, [dispatch])
}
