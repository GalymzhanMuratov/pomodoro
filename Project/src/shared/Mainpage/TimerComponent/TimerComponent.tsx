import React from "react";
import styles from './timercomponent.css'
import { Timer } from "./Timer/Timer";

export function TimerComponent() {
    return (
        <div>

            <Timer initseconds={1500} />
        </div>
    )
}