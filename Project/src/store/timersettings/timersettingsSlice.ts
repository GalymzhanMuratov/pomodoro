import { createSlice } from "@reduxjs/toolkit";

type Settings = {
    workMinutes: number;
    breakMinutes: number;
    bigbreakMinutes: number;
}

const getInitialState = (): Settings => {
    let initialState: Settings = { workMinutes: 25, breakMinutes: 5, bigbreakMinutes: 15 };
    if (typeof window !== 'undefined') {
        const storedState = localStorage.getItem('settings');
        if (storedState) {
            try {
                const parsedState = JSON.parse(storedState);
                // Ensure the parsed state matches the expected structure
                if (parsedState) {
                    initialState = parsedState;
                }
            } catch (error) {
                console.error('Error parsing stored state:', error);
            }
        }
    }
    return initialState;
};

const initialState: Settings = getInitialState()

const timersettingsSlice = createSlice({
    name: 'timersettings',
    initialState,
    reducers: {
        setWork(state, action) {
            state.workMinutes = action.payload;
            localStorage.setItem('settings', JSON.stringify(state))
        },
        setBreak(state, action) {
            state.breakMinutes = action.payload;
            localStorage.setItem('settings', JSON.stringify(state))
        },
        setBigBreak(state, action) {
            state.bigbreakMinutes = action.payload;
            localStorage.setItem('settings', JSON.stringify(state))
        },
    }
})


const { actions, reducer } = timersettingsSlice

export const { setWork, setBreak, setBigBreak } = actions

export default reducer