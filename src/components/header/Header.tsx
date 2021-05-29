import React from 'react'
import {NavLink} from 'react-router-dom'
import {PATH} from '../routes/Routes'
import s from './header.module.css'

export const Header = () => {
    return (
        <div className={s.header}>
            <NavLink to={PATH.REGISTRATION}>Registration</NavLink>
            <NavLink to={PATH.LOGIN}>Login</NavLink>
            <NavLink to={PATH.NEW_PASSWORD}>New password</NavLink>
            <NavLink to={PATH.PROFILE}>Profile</NavLink>
            <NavLink to={PATH.PASSWORD_RECOVERY}>Recover password</NavLink>
            <NavLink to={PATH.PACKS}>Packs</NavLink>
            <NavLink to={PATH.CARDS}>Cards</NavLink>
        </div>
    )
}