import {Page, test as base} from "@playwright/test"
import {pwRestoreAuthorities} from "../pw_authorities"

interface TestStore {
    page: Page
}

export const testStore = base.extend<TestStore>({
    page: async ({page: p, context}, use) => {
        await p.close()
        await context.addInitScript("window.IS_PLAYWRIGHT = true;")
        const page = await context.newPage()

        await use(page)

        await pwRestoreAuthorities(page)
    },
})
