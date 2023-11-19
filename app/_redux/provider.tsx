"use client"

import {store} from "../_redux/config"
import { Provider } from "react-redux"

export function GlobalProvider({children} : {children: React.ReactNode}) {
    return <Provider store={store}>
        {children}
    </Provider>
}