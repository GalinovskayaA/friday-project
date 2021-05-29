import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent} from "react";
import s from "./SInp.module.css";

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type SuperInputTextPropsType = DefaultInputPropsType & { // и + ещё пропсы которых нет в стандартном инпуте
    onChangeText?: (value: string) => void
    onChangeValue?: (value: string) => void // меняем в стейте на email пользователя
    onEnter?: () => void
    info?: string
    error?: string
    spanClassName?: string
    value?: string
};

const SInp: React.FC<SuperInputTextPropsType> = (
    {
        type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
        onChange, onChangeText,
        onKeyPress, onEnter,
        info,
        error,
        className, spanClassName,
        onChangeValue,
        value,

        ...restProps// все остальные пропсы попадут в объект restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange // если есть пропс onChange
        && onChange(e); // то передать ему е (поскольку onChange не обязателен)

        onChangeText && onChangeText(e.currentTarget.value)
        onChangeValue && onChangeValue(e.currentTarget.value) // меняем в стейте на email пользователя
    }
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);

        e.key === "Enter" // если нажата кнопка Enter
        && onEnter // и есть пропс onEnter
        && onEnter(); // то вызвать его
    }

    const finalSpanClassName = `${s.error} ${spanClassName ? spanClassName : ""}`;
    const finalInputClassName = `{ ${error ? s.errorInput : s.superInput} ${className}`;

    return (
        <div className={s.content}>
            <div>
                <input
                    type={type}
                    onChange={onChangeCallback}
                    onKeyPress={onKeyPressCallback}
                    className={finalInputClassName}
                    value={value}

                    {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
                />
            </div>
            <div>
                {error && <span className={finalSpanClassName}>{error}</span>}
                {info && <span>{info}</span>}
            </div>
        </div>
    );
};

export default SInp;