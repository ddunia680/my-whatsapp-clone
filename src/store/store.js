import { configureStore } from "@reduxjs/toolkit";

import uiStates from "./uiStates";
import authenticate from "./authenticate";
import users from "./users";

const store = configureStore({
    reducer: {
        uiStates: uiStates,
        authenticate: authenticate,
        users: users
    }
});

export default store;