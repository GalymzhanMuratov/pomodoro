import React, { useEffect, useRef, useState } from "react";
import styles from './select.css'

export function Select() {
    const [selectedOption, setSelectedOption] = useState("Эта неделя");
    const [isActive, setIsActive] = useState(false);
    const optionMenuRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(event: any) {
            //@ts-ignore
            if (optionMenuRef.current && !optionMenuRef.current.contains(event.target)) {
                setIsActive(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSelectClick = () => {
        setIsActive(!isActive);
    };

    const handleOptionClick = (optionText: string) => {
        setSelectedOption(optionText);
        setIsActive(false);
    };

    const options = ["Эта неделя", "Прошедшая неделя", "2 недели назад"].filter(option => option !== selectedOption);

    return (
        <div className={styles.wrap}>
            <div className={styles.wrapped}>

                <div>
                    <div id="select" className={styles.select} onClick={handleSelectClick}>{selectedOption}</div>
                    <div className={isActive ? styles.arrowUp : styles.arrow}>
                        <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 1L8 8L1 1" stroke="#B7280F" stroke-width="2" />
                        </svg>
                    </div>

                </div>
                <ul className={isActive ? styles.optionListAct : styles.optionList} ref={optionMenuRef}>
                    {options.map((option, index) => (
                        <li className={styles.option} key={index} onClick={() => handleOptionClick(option)}>
                            <span className={styles.optionText}>{option}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
