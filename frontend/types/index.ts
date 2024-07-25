import {MouseEventHandler} from "react";
import {array} from "yup";

export interface CustomButtonProps {
    title:string,
    containerStyles?:string,
    handleClick?:MouseEventHandler<HTMLButtonElement>,
    btnType?:"button" | "submit"
    disabled: boolean,
}

export interface ProductCardProps {
    name: string;
    description_short: string;
    description_long: string;
    image: string;
    pvp: number;
    unit: string;
    providerName: string;
    contacts: array;
}