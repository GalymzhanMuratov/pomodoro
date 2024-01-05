import React, { useRef, useState } from "react";
import styles from './dropdown.css'
import { GenericDropdown } from "../../../../../GenericDropdown";
import { DropList } from "./DropList";
import { MenuIcon } from "../../../../../Icons";

type Coords = {
    left: number;
    top: number;
    width: number;
};

interface DropdownProps {
    myid: number;
    onEditClick: () => void;
}


export function Dropdown({ myid, onEditClick }: DropdownProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const controlRef = useRef<HTMLButtonElement>(null);
    const [coords, setCoords] = useState<Coords | null>(null);

    const handleDropdownClose = () => {
        setIsDropdownOpen(false);
    };

    const getCoords = (): Coords | null => {
        const box = controlRef.current?.getBoundingClientRect();

        if (box) {
            return {
                left: box.left - 70,
                top: box.top + box.height + 10,
                width: box.width,
            };
        }

        return null;
    };

    return (
        <button className={styles.menu} ref={controlRef} onClick={() => {
            setIsDropdownOpen(true);
            const coords = getCoords();
            setCoords(coords);
        }}>
            <GenericDropdown classname={styles.menuButton} button={<MenuIcon />}>
                {isDropdownOpen && coords && (
                    <DropList coords={coords} myid={myid} onEditClick={onEditClick} onClose={handleDropdownClose} />
                )}
            </GenericDropdown>
        </button    >
    )
}