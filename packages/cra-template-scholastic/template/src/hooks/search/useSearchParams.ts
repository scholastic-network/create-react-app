import {useHistory} from "react-router-dom"
import {HistoryParamValue, pushUrlHistoryParamFn, pushUrlHistoryParams} from "../../lib/routing"
import {useMemo} from "react"

/**
 * Handle each search parameter individually
 * @param paramNames - names of parameters to handle
 * @returns an object contains key - value pair for every paramName. Where key - paramName and value - object with fields "value" and "setValue"
 * @example
 * const {
 *   school: {value: schoolValue, setValue: setSchool},
 *   district: {value: districtValue, setValue: setDistrict}
 * } = useSearchParams("school", "district")
 */
export const useSearchParams = (
    ...paramNames: Array<string>
): {[paramName: string]: {value?: string; setValue: (paramValue?: string) => void}} => {
    const history = useHistory()
    const {
        location: {search},
    } = history

    return useMemo(() => {
        const urlParams = new URLSearchParams(search)
        return paramNames.reduce(
            (res, paramName) => ({
                ...res,
                [paramName]: {
                    value: urlParams.get(paramName) || undefined,
                    setValue: pushUrlHistoryParamFn(history, paramName),
                },
            }),
            {}
        )
    }, [history, paramNames, search])
}

/**
 * Handle a group of search params
 * @param paramNames - names of parameters to handle
 * @returns an array, where array[0] is an object with values and array[1] is a "set parameters" method
 * @example
 * const [{school: schoolValue, district: districtValue}, setData] = useSearchParamsGroup("school", "district")
 * setData({school: "1234", district: "321"})
 */
export const useSearchParamsGroup: (
    ...paramNames: Array<string>
) => [
    {[paramName: string]: string | undefined},
    (params: {[paramName: string]: HistoryParamValue}) => void
] = (...paramNames) => {
    const history = useHistory()
    const {location: search} = history

    const valuesInitial = paramNames.reduce((res, name) => ({...res, [name]: null}), {})

    const values = useMemo(() => {
        const urlParams = new URLSearchParams(history.location.search)
        return paramNames.reduce(
            (values, paramName) => ({
                ...values,
                [paramName]: urlParams.get(paramName) || undefined,
            }),
            valuesInitial
        )
    }, [paramNames, search, valuesInitial])

    return useMemo(() => {
        return [values, pushUrlHistoryParams(history)]
    }, [history, values])
}
