import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './counter/counterSlice'
import tasksSlice from "./tasks/tasksSlice";
import graphSlice from "./graph/graphSlice";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        tasks: tasksSlice,
        graph: graphSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;