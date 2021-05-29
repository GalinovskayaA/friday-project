import {Dispatch} from "redux";
import {commonAPI} from "../../../api/api";

const initialState = {
    errorPassMessage: "",
    passwordStatus: false,
    status: false
}

type InitialStateType = typeof initialState

export const newPasswordReducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case "newPassword/ERROR_MESSAGE": {
            return {...state, errorPassMessage: action.errorPassMessage}
        }
        case "newPassword/SET_PASS_STATUS": {
            return {...state, passwordStatus: action.passwordStatus}
        }
        case "newPassword/SET_STATUS": {
            return {...state, status: action.status}
        }
        default:
            return state;
    }
};

// action
export const errorPassMessageAC = (errorPassMessage: string) => ({type: "newPassword/ERROR_MESSAGE", errorPassMessage} as const);
export const setPasswordStatusAC = (passwordStatus: boolean) => ({type: "newPassword/SET_PASS_STATUS", passwordStatus} as const);
export const setServerStatusAC = (status: boolean) => ({type: "newPassword/SET_STATUS", status} as const);


// thunks
export const newPasswordTC = (newPassword: string, token: string) => {
    return (dispatch: ThunkDispatch) => {
        dispatch(setServerStatusAC(true))
        console.log(newPassword)
        console.log(token)
        commonAPI.changePassword(newPassword, token)
            .then((res) => {
                dispatch(setPasswordStatusAC(true))
                console.log("в then все ок")
            })
            .catch((error) => {
                dispatch(errorPassMessageAC(error.message))
                console.log("error " + error.message)
            })
            .finally(() => {
                dispatch(setServerStatusAC(false))
            })
    }
}


// type
export type errorPassMessageActionType = ReturnType<typeof errorPassMessageAC>
export type setPasswordStatusActionType = ReturnType<typeof setPasswordStatusAC>
export type setServerStatusActionType = ReturnType<typeof setServerStatusAC>

type ActionsType = errorPassMessageActionType | setPasswordStatusActionType | setServerStatusActionType
type ThunkDispatch = Dispatch<ActionsType>