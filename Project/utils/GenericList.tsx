import React from "react";
import styles from './genericlist.css'

interface IITem {
    id: string;
    text: React.ReactNode;
    onClick?: (id: string) => void;
    className?: string;
    As?: 'a' | 'li' | 'button' | 'div';
    href?: string;

}

interface IGenericListProps {
    list: IITem[]
}

const noop = () => { }

export function GenericList({ list }: IGenericListProps) {
    return (
        <>
            {list.map(({ As = 'div', text, onClick = noop, className, id, href }) => (
                <As
                    className={className}
                    onClick={() => onClick(id)}
                    key={id}
                    href={href}
                >
                    {text}
                </As>
            ))}
        </>
    )
}