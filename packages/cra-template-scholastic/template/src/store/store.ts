import {rootReducer} from "./rootReducer"
import {configureStore} from "../../../scholastic-client-components/src/SharedPackages/reduxToolkit"
import {formErrorMiddleware} from "../../../scholastic-client-components/src/middlewares/formErrorMiddleware"
import {getStoreWatchers} from "../../../scholastic-client-components/src/middlewares/reduxMiddlewares"

export const store = configureStore({
    reducer: rootReducer,
    middleware: [...getStoreWatchers(), formErrorMiddleware.middleware],
})

if (process.env.NODE_ENV === "development" && module.hot) {
    module.hot.accept("./rootReducer", () => {
        const newRootReducer = require("./rootReducer").rootReducer
        store.replaceReducer(newRootReducer)
    })
}
