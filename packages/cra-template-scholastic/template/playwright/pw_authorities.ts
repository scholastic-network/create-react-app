import {Page} from "@playwright/test"

export const pwRemoveAuthorities = async (page: Page, authoritiesToRemove: string[]) => {
    await page.evaluate(subscribeAsync)
    await page.evaluate((authoritiesToRemove) => {
        window.store.dispatch({
            type: "auth/setPersonAuthorities",
            payload: window.authorities.filter(
                (authority: string) => !authoritiesToRemove.includes(authority)
            ),
        })
    }, authoritiesToRemove)
}

const subscribeAsync = () => {
    return new Promise<void>((resolve) => {
        const store = window.store.getState()
        if (store.auth.person?.authorities) {
            resolve()
        } else {
            const unsubscribe = window.store.subscribe(() => {
                const store = window.store.getState()
                const authorities = store.auth.person?.authorities
                if (authorities) {
                    unsubscribe()
                    resolve()
                }
            })
        }
    })
}

export const pwRestoreAuthorities = async (page: Page) => {
    await page.evaluate(() => {
        window.store.dispatch({
            type: "auth/setPersonAuthorities",
            payload: window.authorities,
        })
    })
}
