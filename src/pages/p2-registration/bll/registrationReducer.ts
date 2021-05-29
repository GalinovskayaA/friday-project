import {Dispatch} from "redux";
import {commonAPI} from "../../../api/api";
import {ActionsTypes, RegistrationUserType} from "./storeRegistration";

export const initialState = {
    id: '1',
    login: '',
    password: '',
    confirmPassword: '',
    isSuccess: false,
    rememberMe: false,
    error: false,
    loading: false,
    errorServer: ''
};
const SET_LOGIN = "SET_LOGIN"
const SET_ERROR = "SET_ERROR"
const SET_ERR_SERV = "SET_ERR_SERV"
const SET_PASSWORD = "SET_PASSWORD"
const SET_REPEAT_PASSWORD = "SET_REPEAT_PASSWORD"
const SET_SUCCESS = "SET_SUCCESS"
const SET_LOADING = "SET_LOADING"
const SET_REMEMBER_ME = "SET_REMEMBER_ME"

export const registrationReducer = (state: RegistrationUserType = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case  SET_LOGIN: {
            return {
                ...state,
                login: action.login
            };
        }
        case  SET_PASSWORD: {
            return {
                ...state,
                password: action.password
            };
        }
        case  SET_REPEAT_PASSWORD: {
            return {
                ...state,
                confirmPassword: action.repeatPassword
            };
        }
        case  SET_SUCCESS: {
            return {
                ...state,
                isSuccess: action.isSuccess
            };
        }
        case  SET_LOADING: {
            return {
                ...state,
                loading: action.loading
            };
        }
        case  SET_ERROR: {
            return {
                ...state,
                error: action.error
            };
        }
        case  SET_ERR_SERV: {
            return {
                ...state,
                errorServer: action.err
            };
        }
        case SET_REMEMBER_ME: {
            return {
                ...state,
                rememberMe: action.rememberMe
            };
        }
        default:
            return state;
    }
};

export const actionsRegistrations = {
    setLogin: (login: string) => ({type: SET_LOGIN, login}) as const,
    postPassword: (password: string) => ({type: 'SET_PASSWORD', password}) as const,
    postRepeatPassword: (repeatPassword: string) => ({type: 'SET_REPEAT_PASSWORD', repeatPassword}) as const,
    setSuccess: (isSuccess: boolean) => ({type: 'SET_SUCCESS', isSuccess}) as const,
    setLoading: (loading: boolean) => ({type: 'SET_LOADING', loading}) as const,
    setError: (error: boolean) => ({type: SET_ERROR, error}) as const,
    setErrServ: (err: string) => ({type: SET_ERR_SERV, err}) as const,
    postRememberMe: (rememberMe: boolean) => ({type: 'SET_REMEMBER_ME', rememberMe}) as const,
}

export const createUserTC = (login: string, password: string) => {
    return (dispatch: Dispatch) => {
        commonAPI.signup(login, password)
            .then(res => {
                dispatch(actionsRegistrations.setLoading(false))
                dispatch(actionsRegistrations.setSuccess(true))
                setTimeout(() => dispatch(actionsRegistrations.setSuccess(false)), 3000)
            })
            .catch(er => {
                console.log(er)

                dispatch(actionsRegistrations.setErrServ(er.response.data.error))
                setTimeout(() => dispatch(actionsRegistrations.setErrServ('')), 3000)
            })
            .finally(() => {
                dispatch(actionsRegistrations.setLoading(false))
            })
        /*.catch(er => {
            console.log(er)
            dispatch(actionsRegistrations.setLoading(false))
            dispatch(actionsRegistrations.setErrServ(er.response.data.error))
            setTimeout(() => dispatch(actionsRegistrations.setErrServ('')), 3000)
        })*/
    }
}