import React, {useState} from 'react'
import s from './../recoverPassword.module.css'
import SuperInputText from "../../../components/SuperComponents/SuperInput/SuperInputText";
import SuperButton from "../../../components/SuperComponents/SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {recoverPasswordTC} from "../bll/recoverPasswordReducer";
import {AppRootStateType} from "../../../app/store";
import Preloader from "../../../components/preloader/Preloader";

export const RecoverPassword = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState<string>('')

    const from = useSelector<AppRootStateType, string>(state => state.recoverPassword.from)
    const message = useSelector<AppRootStateType, string>(state => state.recoverPassword.message)
    const info = useSelector<AppRootStateType, string>(state => state.recoverPassword.infoMessage)
    const error = useSelector<AppRootStateType, string>(state => state.recoverPassword.errorMessage)
    const status = useSelector<AppRootStateType, boolean>(state => state.recoverPassword.status)
    const recoverPassword = (setEmail: string, from: string, message: string) => {
        dispatch(recoverPasswordTC(setEmail, from, message))
    }

    const onChange = (e: React.FormEvent<HTMLInputElement>) => {
        let email = e.currentTarget.value
        setEmail(email)
    }

    return (
        <div className={s.content}>
            <div className={s.preloader}>{ status ? <Preloader/> : "" }</div> {/*// крутилка*/}
            <div className={s.contentMain}>
                <div>
                    <h1> Enter your email </h1>
                    <div className={s.answerServer}> {error && <span className={s.error}>{error}</span>}
                        {info && <span>{info}</span>} </div>
                    <SuperInputText type={'text'}
                                    value={email}
                                    onChange={onChange}/>
                </div>
                <div>
                    <SuperButton name={"Recover password"}
                                 onClick={() => recoverPassword(email, from, message)}
                                 disabled={status}/>
                </div>
            </div>
        </div>
    )
}
