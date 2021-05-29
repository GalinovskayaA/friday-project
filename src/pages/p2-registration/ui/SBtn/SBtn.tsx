import React, {ButtonHTMLAttributes, DetailedHTMLProps} from "react";
import s from "./SBtn.module.css";

// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

type SuperButtonPropsType = DefaultButtonPropsType & {
    name?: string
    error?: string
    red?: boolean
    callFunction?: () => void //добавил для типизации функции
}

const SBtn: React.FC<SuperButtonPropsType> = (
    {
        callFunction,//добавил для вызова функции
        red, className, name,
        ...restProps// все остальные пропсы попадут в объект restProps, там же будет children
    }
) => {
    const finalClassName = `${red ? s.red : s.default} ${s.default}`;
    const nameButton = name ? name : "click"

    return (
        <button
            className={finalClassName}
            onClick={() => callFunction ? callFunction() : ""} //изменил для приходящей функции
            {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
        >{nameButton}</button>
    );
}

export default SBtn;