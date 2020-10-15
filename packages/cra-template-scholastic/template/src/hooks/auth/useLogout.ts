import {useDispatch} from "react-redux"
import {authSlice, setAxiosTokenHeader} from "scholastic-client-components"
import {useCallback} from "react"
import {authAPI} from "../../api/connectedAPI"
import {clearStore} from "../../store/rootReducer"
import {useHistory} from "react-router-dom"

export const useLogout = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const finish = useCallback(() => {
        dispatch(authSlice.actions.finishLogout())
        dispatch(clearStore())
        history.push("/login")
        setAxiosTokenHeader(undefined)
    }, [dispatch, history])

    const logout = useCallback(() => {
        dispatch(authSlice.actions.startLogout())
        dispatch(
            authAPI.logout({
                onSuccess: finish,
                onError: finish,
            })
        )
    }, [dispatch, finish])

    return {
        logout,
    }
}
