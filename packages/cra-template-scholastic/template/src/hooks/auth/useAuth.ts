import {useCallback} from "react"
import {authAPI} from "../../api/connectedAPI"
import {useDispatch} from "react-redux"
import {
    authSlice,
    setAxiosTokenHeader,
    PersonPortal,
    getLoginReferrer,
    loginReferrerPath,
} from "scholastic-client-components"
import {useHistory} from "react-router-dom"
import {useSearchParams} from "../search/useSearchParams"

export const useAuth = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const {
        [loginReferrerPath]: {value: referrerPathValue},
    } = useSearchParams(loginReferrerPath)
    const referrerPath = !!referrerPathValue && getLoginReferrer(history.location.search)

    return useCallback(() => {
        dispatch(authSlice.actions.startAuth())
        dispatch(
            authAPI.auth({
                onSuccess: (response) => {
                    setAxiosTokenHeader(response.token)
                    dispatch(
                        authSlice.actions.successAuth({
                            ...response,
                            portal: PersonPortal.StudentsCreative,
                        })
                    )
                    if (referrerPath) {
                        history.replace(referrerPath)
                    }
                },
                onError: (errorResponse) => {
                    if (errorResponse.response?.status === 403) {
                        setAxiosTokenHeader(errorResponse.response.data.token)
                        dispatch(
                            authSlice.actions.successAuth({
                                ...errorResponse.response.data,
                                portal: PersonPortal.StudentsCreative,
                            })
                        )
                    } else {
                        dispatch(authSlice.actions.failAuth())
                    }
                },
            })
        )
    }, [dispatch, history, referrerPath])
}
