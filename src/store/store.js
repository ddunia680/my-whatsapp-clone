import { configureStore } from "@reduxjs/toolkit";

import uiStates from "./uiStates";
import authenticate from "./authenticate";

const store = configureStore({
    reducer: {
        uiStates: uiStates,
        authenticate: authenticate
    }
});

export default store;