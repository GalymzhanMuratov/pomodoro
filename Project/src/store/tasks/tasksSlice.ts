import { createSlice } from "@reduxjs/toolkit";

interface Task {
    name: string;
    id: number;
    amount: number;
}

interface TaskState {
    list: Task[];
}

const initialState: TaskState = { list: [] }

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask(state, action) {
            state.list.push(action.payload)
        },
        editTask(state, action) {
            const { id, name } = action.payload;
            const taskToUpdate = state.list.find(task => task.id === id);
            if (taskToUpdate) {
                taskToUpdate.name = name;
            }
        },
        removeTask(state, action) {
            state.list = state.list.filter(task => task?.id !== action.payload?.id)
        },
        addAmount(state, action) {
            state.list = state.list.map(task => task.id === action.payload.id ? { ...task, amount: task.amount += 1 } : task)
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
                }
            }
        },
        decreaseAmountAuto(state, action) {
            const { id } = action.payload;
            const task = state.list.find(task => task.id === id);
            if (task) {
                if (task.amount <= 1) {
                    task.amount = 0;
                } else {
                    task.amount -= 1;
                }
            }
        }
    }

})

const { actions, reducer } = tasksSlice

export const { addTask, editTask, removeTask, addAmount, decreaseAmount, decreaseAmountAuto } = actions

export default reducer