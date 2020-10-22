import {rootReducer} from "./rootReducer"
import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit"
import {formErrorMiddleware, loadAuthedStore} from "scholastic-client-components"

const preloadedState = loadAuthedStore()

export const store = configureStore({
    preloadedState,
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware(), formErrorMiddleware.middleware],
})

if (process.env.NODE_ENV === "development" && module.hot) {
    module.hot.accept("./rootReducer", () => {
        const newRootReducer = require("./rootReducer").rootReducer
        store.replaceReducer(newRootReducer)
    })
}
