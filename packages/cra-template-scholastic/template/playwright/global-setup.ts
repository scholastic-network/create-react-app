import {FullConfig, request} from "@playwright/test"
import {Store} from "redux"

async function globalSetup(config: FullConfig) {
    const requestContext = await request.newContext()
    await requestContext.post(config.projects[0].use.baseURL + "api/login", {
        data: {
            email: "admin",
            password: "password",
        },
    })
    await requestContext.storageState({path: "./playwright/storageState.json"})
    await requestContext.dispose()
}

export default globalSetup

declare global {
    interface Window {
        IS_PLAYWRIGHT: boolean
        store: Store
        authorities: string[]
    }
}
