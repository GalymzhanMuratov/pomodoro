import React from "react";
import { BulletsIcon } from "./BulletsIcon";
import { DeleteIcon } from "./DeleteIcon";
import { EditIcon } from "./EditIcon";
import { FocusIcon } from "./FocusIcon";
import { FocusIcon2 } from "./FocusIcon2";
import { LogoIcon } from "./LogoIcon";
import { MenuIcon } from "./MenuIcon";
import { PauseIcon } from "./PauseIcon";
import { PauseIcon2 } from "./PauseIcon2";
import { PausetimeIcon } from "./PausetimeIcon";
import { PausetimeIcon2 } from "./PausetimeIcon2";
import { StatsIcon } from "./StatsIcon";
import { TomatoIcon } from "./TomatoIcon";
import { TomatoIcon2 } from "./TomatoIcon2";
import { ZoominIcon } from "./ZoominIcon";
import { ZoomoutIcon } from "./ZoomoutIcon";
import { SelectArrow } from "./SelectArrow";
import { Cross } from "./Cross";

export enum EIcons {
    bullet = "BulletsIxon",
    cross = "Cross",
    delete = "DeleteIcon",
    edit = "EditIcon",
    focus = "FocusIcon",
    focus2 = "FocusIcon2",
    logo = "LogoIcon",
    menu = "MenuIcon",
    pause = "PauseIcon",
    pause2 = "PauseIcon2",
    pausetime = "PausetimeIcon",
    pausetime2 = "PausetimeICon2",
    selectarrow = "SelectArrow",
    stats = "StatsIcon",
    tomato = "TomatoIcon",
    tomato2 = "TomatoIcon2",
    zoomin = "ZoominIcon",
    zoomout = "ZoomoutIcon"
}

const icons = {
    [EIcons.bullet]: <BulletsIcon />,
    [EIcons.cross]: <Cross />,
    [EIcons.delete]: <DeleteIcon />,
    [EIcons.edit]: <EditIcon />,
    [EIcons.focus]: <FocusIcon />,
    [EIcons.focus2]: <FocusIcon2 />,
    [EIcons.logo]: <LogoIcon />,
    [EIcons.menu]: <MenuIcon />,
    [EIcons.pause]: <PauseIcon />,
    [EIcons.pause2]: <PauseIcon2 />,
    [EIcons.pausetime]: <PausetimeIcon />,
    [EIcons.pausetime2]: <PausetimeIcon2 />,
    [EIcons.selectarrow]: <SelectArrow />,
    [EIcons.stats]: <StatsIcon />,
    [EIcons.tomato]: <TomatoIcon />,
    [EIcons.tomato2]: <TomatoIcon2 />,
    [EIcons.zoomin]: <ZoominIcon />,
    [EIcons.zoomout]: <ZoomoutIcon />,
}

type IconProps = {
    name: EIcons;
}

export function Icon({ name }: IconProps) {
    return (
        <div style={{ overflow: "hidden" }}>
            {icons[name]}
        </div>
    )
}