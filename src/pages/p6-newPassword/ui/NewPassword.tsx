import React, {useState} from 'react'
import {useParams, useHistory} from 'react-router-dom';
import SuperInputText from "../../../components/SuperComponents/SuperInput/SuperInputText";
import SuperButton from "../../../components/SuperComponents/SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {errorPassMessageAC, newPasswordTC} from "../bll/newPasswordReducer";
import {AppRootStateType} from "../../../app/store";
import {PATH} from "../../../components/routes/Routes";
import Preloader from "../../../components/preloader/Preloader";
import s from "./newPassword.module.css"


export const NewPassword = () => {
    const dispatch = useDispatch()
    const history = useHistory();

    const [newPassword, setNewPassword] = useState<string>('')
    const [newPassword2, setNewPassword2] = useState<string>('')
    const {token} = useParams<{ token: string }>()
    const passwordStatus = useSelector<AppRootStateType, boolean>(state => state.newPassword.passwordStatus)
    const errorPassMessage = useSelector<AppRootStateType, string>(state => state.newPassword.errorPassMessage)
    const status = useSelector<AppRootStateType, boolean>(state => state.newPassword.status)

    const redirectLogin = () => history.push(PATH.LOGIN)

    const onChange = (e: React.FormEvent<HTMLInputElement>) => {
        let newPassword = e.currentTarget.value
        setNewPassword(newPassword)
    }

    const repeatOnChange = (e: React.FormEvent<HTMLInputElement>) => {
        let newPassword2 = e.currentTarget.value
        setNewPassword2(newPassword2)
    }

    const onChangePassword = () => {
        if (newPassword.length > 7) {
            if (newPassword === newPassword2) {
                dispatch(newPasswordTC(newPassword, token))
            } else {
                (dispatch(errorPassMessageAC("Passwords don't match")))
                setTimeout(() => dispatch(errorPassMessageAC('')), 3000)
            }
        } else {
            dispatch(errorPassMessageAC("Password must be 8 or more characters"))
            setTimeout(() => dispatch(errorPassMessageAC('')), 3000)
        }
    }

    if (passwordStatus) setTimeout(redirectLogin, 2000)


    return (
        <div className={s.content}>
            <div className={s.preloader}>{status ? <Preloader/> : ""}</div>
            <div className={s.contentMain}>
                <h1> NewPassword </h1>
                <div className={s.answerServer}> {errorPassMessage} </div>
                <div> Enter your new password </div>
                <SuperInputText type={'password'} placeholder={'password'} value={newPassword} onChange={onChange}/>
                <div> Repeat your new password </div>
                <SuperInputText type={'password'} placeholder={'password'} value={newPassword2} onChange={repeatOnChange}/>
                <SuperButton name={'New Password'} callFunction={onChangePassword}/>
            </div>
        </div>
    )
}