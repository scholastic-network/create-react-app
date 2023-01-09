import {PlaywrightTestConfig} from "@playwright/test"

const config: PlaywrightTestConfig = {
    /*repeatEach: 10,*/
    testDir: "./playwright/tests",
    fullyParallel: true,
    globalSetup: "./playwright/global-setup",
    reporter: [["list"], ["html", {outputFolder: "./playwright/report" /*open: "never"*/}]],
    workers: 6,
    use: {
        headless: true,
        baseURL: "http://school.tsn.com/",
        storageState: "./playwright/storageState.json",
        trace: "on-first-retry",
        viewport: {width: 1600, height: 900},
    },
}

export default config
