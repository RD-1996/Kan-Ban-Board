import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user.slice";
import taskReducer from "./reducers/tasks.slice";

export default configureStore({
  reducer: {
    user: userReducer,
    tasks: taskReducer,
  },
});
