import { createSlice } from "@reduxjs/toolkit";

type Task = {
    name: string;
    id: number;
    amount: number;
}

type TaskState = {
    list: Task[];
}

const getInitialState = (): TaskState => {
    let initialState: TaskState = { list: [] };
    if (typeof window !== 'undefined') {
        const storedState = localStorage.getItem('list');
        if (storedState) {
            try {
                const parsedState = JSON.parse(storedState);
                // Ensure the parsed state matches the expected structure
                if (parsedState && Array.isArray(parsedState.list)) {
                    initialState = parsedState;
                }
            } catch (error) {
                console.error('Error parsing stored state:', error);
            }
        }
    }
    return initialState;
};


const initialState: TaskState = getInitialState()

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask(state, action) {
            state.list.push(action.payload)
            localStorage.setItem('list', JSON.stringify(state))
        },
        editTask(state, action) {
            const { id, name } = action.payload;
            const taskToUpdate = state.list.find(task => task.id === id);
            if (taskToUpdate) {
                taskToUpdate.name = name;
                localStorage.setItem('list', JSON.stringify(state))
            }
        },
        removeTask(state, action) {
            state.list = state.list.filter(task => task?.id !== action.payload?.id)
            localStorage.setItem('list', JSON.stringify(state))
        },
        addAmount(state, action) {
            state.list = state.list.map(task => task.id === action.payload.id ? { ...task, amount: task.amount += 1 } : task)
            localStorage.setItem('list', JSON.stringify(state))
        },
        decreaseAmount(state, action) {
            const { id } = action.payload;
            const task = state.list.find(task => task.id === id);
            if (task) {
                if (task.amount <= 1) {
                    alert('Число помидорок не может быть меньше 1. Удалите задачу если она выполнена/неактуальна.');
                    task.amount = 1;
                } else {
                    task.amount -= 1;
                    localStorage.setItem('list', JSON.stringify(state))
                }
            }
        },
        decreaseAmountAuto(state, action) {
            const { id } = action.payload;
            const task = state.list.find(task => task.id === id);
            if (task) {
                if (task.amount <= 1) {
                    task.amount = 0;
                    localStorage.setItem('list', JSON.stringify(state))
                } else {
                    task.amount -= 1;
                    localStorage.setItem('list', JSON.stringify(state))
                }
            }
        }
    }

})

const { actions, reducer } = tasksSlice

export const { addTask, editTask, removeTask, addAmount, decreaseAmount, decreaseAmountAuto } = actions

export default reducer