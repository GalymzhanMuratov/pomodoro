import React from "react";
import styles from './Genericdropdown.css'

interface IDropdownProps {
    button: React.ReactNode;
    children: React.ReactNode;
    isOpen?: boolean;
    classname?: string;
    onOpen?: () => void;
    onClose?: () => void;
}

const NOOP = () => { }

export function GenericDropdown({
    button,
    children,
    isOpen,
    onClose = NOOP,
    onOpen = NOOP,
    classname
}: IDropdownProps) {
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(isOpen ?? false);

    const handleOpen = () => {
        setIsDropdownOpen(prevState => !prevState);
        if (!isDropdownOpen) {
            onOpen();
        } else {
            onClose();
        }
    };


    const handleDropdownClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    return (
        <div className={classname}>
            <div onClick={handleOpen}>{button}</div>
            {isDropdownOpen && (
                <div className={styles.listContainer} onClick={handleDropdownClick}>
                    <div className={styles.list}>
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
}