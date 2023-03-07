import { configureStore } from "@reduxjs/toolkit";

import uiStates from "./uiStates";

const store = configureStore({
    reducer: {
        uiStates: uiStates
    }
});

export default store;