import {rootReducer} from "./rootReducer"
import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit"
import {formErrorMiddleware} from "scholastic-client-components"

export const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware(), formErrorMiddleware.middleware],
})

if (process.env.NODE_ENV === "development" && module.hot) {
    module.hot.accept("./rootReducer", () => {
        const newRootReducer = require("./rootReducer").rootReducer
        store.replaceReducer(newRootReducer)
    })
}
