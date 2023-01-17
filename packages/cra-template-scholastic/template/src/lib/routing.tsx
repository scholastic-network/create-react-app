import {createBrowserHistory} from "history"

export const history = createBrowserHistory({
    basename: process.env.PUBLIC_URL,
})
export type HistoryParamValue = string | undefined | null

export const pushUrlHistoryParamFn =
    (history: any, paramName: string | Array<string>) => (paramValue: HistoryParamValue) => {
        const params = new URLSearchParams(history.location.search)
        if (paramName instanceof Array) {
            if (!paramValue) {
                for (const name of paramName) params.delete(name)
            }
        } else if (paramValue) {
            params.set(paramName, paramValue)
        } else {
            params.delete(paramName)
        }
        history.push({...history.location, search: params.toString()})
    }

export const pushUrlHistoryParams =
    (history: any) => (params: {[paramName: string]: HistoryParamValue}) => {
        const urlSearchParams = new URLSearchParams(history.location.search)

        Object.entries(params).forEach(([paramName, paramValue]) => {
            if (paramValue) {
                urlSearchParams.set(paramName, paramValue)
            } else {
                urlSearchParams.delete(paramName)
            }
        })
        history.push({...history.location, search: urlSearchParams.toString()})
    }

export enum PortalRoutes {
    School = "/school_portal",
    Business = "/business_portal",
    Partner = "/partner_portal",
}

export enum AppPaths {
    SchoolLicenses = "/school_licenses",
    BusinessLicenses = "/business_licenses",
}

export enum ModalParams {
    ModalId = "modal_id",
}

export enum Form {
    Form = "form",
}
