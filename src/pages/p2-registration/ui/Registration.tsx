import React, {useState} from 'react'
import s from './Registration.module.css'
import {useDispatch, useSelector} from "react-redux";
import {
    actionsRegistrations, createUserTC,
} from "../bll/registrationReducer";
import {AppRootStateType} from "../../../app/store";
import {NavLink, Redirect} from "react-router-dom";
import SBtn from "./SBtn/SBtn";
import SCBox from "./SCBox/SCBox";
import SInp from "./SInp/SInp";
import {PATH} from "../../../components/routes/Routes";
import Preloader from "../../../components/preloader/Preloader";

export const Registration: React.FC = () => {

    const dispatch = useDispatch();

    const [login, setLogin] = useState('galiale@bk.ru')
    const [password, setPassword] = useState('123456789')
    const [password2, setPassword2] = useState('123456789')
    const [rememberMe, setRememberMe] = useState(false)
    const stateRegistrationIsSuccess = useSelector<AppRootStateType>(state => state.registration.isSuccess)
    const stateRegistrationError = useSelector<AppRootStateType>(state => state.registration.error)
    const errorServer = useSelector<AppRootStateType>(state => state.registration.errorServer)
    const stateLoading = useSelector<AppRootStateType>(state => state.registration.loading)

    const addUser = () => {

        if (password !== '' && password2 !== '' && login !== '') {
            if (password === password2) {
                dispatch(createUserTC(login, password))
                dispatch(actionsRegistrations.setLoading(true))
            }
        } else {
            dispatch(actionsRegistrations.setError(true))
            dispatch(actionsRegistrations.setSuccess(false))
        }
    }
    const onLoginChange = (e: React.FormEvent<HTMLInputElement>) => {
        let login = e.currentTarget.value
        setLogin(login)
    }

    const onPasswordChange = (e: React.FormEvent<HTMLInputElement>) => {
        let password = e.currentTarget.value
        setPassword(password)
    }

    const repeatOnPasswordChange = (e: React.FormEvent<HTMLInputElement>) => {
        let repeatPassword = e.currentTarget.value
        setPassword2(repeatPassword)
    }

    const setRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let rememberMe = e.currentTarget.checked
        setRememberMe(rememberMe)
    }

    if (stateRegistrationIsSuccess) return <Redirect to={PATH.LOGIN}/>

    const errInputLogin = (login === '' && stateRegistrationError) ? 'Обязательное поле' : '';
    const errInputPas = (password === '' && stateRegistrationError) ? 'Обязательное поле' : '';
    const errInputPas2 = (password2 === '' && stateRegistrationError) ? 'Обязательное поле' : '';
    return (
        <div className={s.checkInBlock}>
            <div className={s.preloader}> {stateLoading
                ? <Preloader/>
                : ""
            } </div>
            <div className={s.checkMain}>
                <h1 className={s.checkInTitle}>Registration</h1>
                {(stateRegistrationError || errorServer)
                    ? <div style={{color: 'red'}}> {errorServer ? errorServer : "УПС ошибочка..."}</div>
                    : stateRegistrationIsSuccess
                        ? <div style={{color: 'lime'}}>Success!</div>
                        : <div><br/></div>}
                <label>Email:
                    <div className={s.help}>Example: Alex@company.com</div>
                    <SInp
                        error={errInputLogin}
                        value={login}
                        onChange={onLoginChange}
                        type={'email'}
                        placeholder={'Alex@company.com'}/>
                </label>
                <label>Password:
                    <div className={s.help}>Example: Must be between
                        8-20 character </div>
                    <SInp
                        error={errInputPas}
                        value={password}
                        onChange={onPasswordChange}
                        type={'password'}
                        placeholder={'password'}
                    />
                </label>
                <label>Confirm password:
                    <div className={s.help}>Example: Must be between
                        8-20 character </div>
                    <SInp
                        error={errInputPas2}
                        value={password2}
                        onChange={repeatOnPasswordChange}
                        type={'password'}
                        placeholder={'confirm password'}
                    />
                </label>
                <div className={s.checkInBtn}>
                    <SBtn callFunction={addUser}
                          name={'Register'}
                          disabled={!!stateLoading}

                    />
                </div>
            </div>
        </div>
    )
}