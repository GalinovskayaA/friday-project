import React, {useEffect} from 'react';
import './App.css';
import {Routes} from "../components/routes/Routes";
import {Header} from "../components/header/Header";
import {getAuthUserDataTC} from "../pages/p1-login/bll/loginReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {HashRouter} from "react-router-dom";
import ModalUp from "../components/Modals/ModalUp";

const App = () => {
    const dispatch = useDispatch()
    const userId = useSelector<AppRootStateType, string>(state => state.login._id)

    console.log(userId)
    useEffect(() => {
        dispatch(getAuthUserDataTC())
    }, [dispatch])

    return (
        <div className="App">
            <HashRouter>
                <Header/>
                <Routes/>
                <ModalUp speed={10}/>
            </HashRouter>
        </div>
    );
}

export default App;
