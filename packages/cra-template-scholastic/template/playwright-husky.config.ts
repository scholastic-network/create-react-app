import {PlaywrightTestConfig} from "@playwright/test"
import {default as baseConfig} from "./playwright.config"

const config: PlaywrightTestConfig = {
    ...baseConfig,
    use: {
        ...baseConfig.use,
        headless: true,
    },
    webServer: {
        command: "yarn run start-admin", // TODO: Change Portal
        url: "http://school.tsn.com/admin/", // TODO: Change Portal
        timeout: 120 * 1000,
        reuseExistingServer: true,
    },
    reporter: "line",
}

export default config
