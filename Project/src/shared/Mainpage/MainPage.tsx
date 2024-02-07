import React from 'react'
import styles from './mainpage.css'
import { TaskManagement } from './TaskManagement'
import { TimerComponent } from './TimerComponent'

export function MainPage() {
    return (
        <div className={styles.container}>
            <TaskManagement />
            <TimerComponent />
        </div>
    )
}