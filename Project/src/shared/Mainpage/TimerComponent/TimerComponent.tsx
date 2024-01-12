import React, { useState } from "react";
import styles from './timercomponent.css'
import { Timer } from "./Timer/Timer";
import { TimerSettings } from "./TimerSettings";

export function TimerComponent() {
    const [isSettings, setSettings] = useState(false)

    function toggle() {
        setSettings(!isSettings)
    }

    return (
        <div>
            <button onClick={toggle}>Настройки таймера</button>
            {isSettings && (
                <TimerSettings toggle={toggle} />
            )}
            <Timer />
        </div>
    )
}