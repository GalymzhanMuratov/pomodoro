import { createSlice } from "@reduxjs/toolkit";

interface graphEntry {
    day: string,
    timespent: number,
}

interface graphState {
    list: graphEntry[];
}


const initialState: graphState = {
    list: [
        {
            day: 'Пн',
            timespent: 55,
        },
        {
            day: 'Вт',
            timespent: 85,
        },
        {
            day: 'Ср',
            timespent: 50,
        },
        {
            day: 'Чт',
            timespent: 110,
        },
        {
            day: 'Пт',
            timespent: 40,
        },
        {
            day: 'Сб',
            timespent: 0,
        },
        {
            day: 'Вс',
            timespent: 0,
        }]
}


const graphSlice = createSlice({
    name: "graph",
    initialState,
    reducers: {

    }
})

export default graphSlice.reducer