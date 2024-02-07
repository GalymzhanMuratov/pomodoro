import { configureStore } from "@reduxjs/toolkit";
import tasksSlice from "./tasks/tasksSlice";
import graphSlice from "./graph/graphSlice";
import timersettingsSlice from "./timersettings/timersettingsSlice"

export const store = configureStore({
    reducer: {
        tasks: tasksSlice,
        graph: graphSlice,
        timersettings: timersettingsSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;