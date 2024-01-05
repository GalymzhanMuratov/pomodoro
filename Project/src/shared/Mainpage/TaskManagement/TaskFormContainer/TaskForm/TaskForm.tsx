import React, { useState } from "react";
import styles from './taskform.css'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useDispatch } from "react-redux";
import { addTask } from "../../../../../store/tasks/tasksSlice";

export function TaskForm() {

    const [task, setTask] = useState("")

    const dispatch = useDispatch()

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const newTask = {
            id: Math.floor(Math.random() * 888888) + 100000,
            name: task,
            amount: 1,
        }
        dispatch(addTask(newTask))
        setTask('')
    }
    return (
        <div>

            <Formik
                initialValues={{ taskname: '' }}
                onSubmit={(values, { resetForm }) => {
                    handleSubmit
                    resetForm();
                }}
            >

                <Form onSubmit={handleSubmit} className={styles.form}>
                    <label htmlFor="taskname"></label>
                    <ErrorMessage component='span' name="taskname" />
                    <Field className={styles.input} as="input" id="task" name="taskname" value={task} onChange={(e: any) => setTask(e.target.value)} placeholder="Название задачи" />
                    <button className={styles.button} type="submit">Добавить</button>
                </Form>

            </Formik>
        </div>
    )
}