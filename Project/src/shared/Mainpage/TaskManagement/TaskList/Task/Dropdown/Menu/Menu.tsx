import * as React from "react";
import styles from './menu.css'
import { EIcons, Icon } from "../../../../../../Icons";

export function Menu() {
    return (
        <button className={styles.menuButton}>
            <Icon name={EIcons.menu} />
        </button>
    )
}