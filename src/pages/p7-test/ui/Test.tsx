import React from 'react'
import s from './test.module.css'
import SuperInputText from "../../../components/SuperComponents/SuperInput/SuperInputText";
import SuperCheckbox from "../../../components/SuperComponents/SuperCheckbox/SuperCheckbox";
import SuperButton from "../../../components/SuperComponents/SuperButton/SuperButton";

export const Test = () => {
    return (
        <div className={s.content}>
            <SuperInputText/>
            <SuperCheckbox/>
            <SuperButton/>
        </div>
    )
}