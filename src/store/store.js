import { configureStore } from "@reduxjs/toolkit";

import uiStates from "./uiStates";
import authenticate from "./authenticate";
import users from "./users";
import messages from "./messages";

const store = configureStore({
    reducer: {
        uiStates: uiStates,
        authenticate: authenticate,
        users: users,
        messages: messages
    }
});

export default store;