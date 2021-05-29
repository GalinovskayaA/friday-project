import {actionsRegistrations} from "./registrationReducer";

export type RegistrationUserType = {
    id: string,
    login: string,
    password: string,
    isSuccess: boolean,
    rememberMe: boolean,
    error: boolean,
    loading: boolean
    errorServer: string

}
type SetLoginUserActionType = ReturnType<typeof actionsRegistrations.setLogin>
type PostPasswordUserActionType = ReturnType<typeof actionsRegistrations.postPassword>
type PostPassword2UserActionType = ReturnType<typeof actionsRegistrations.postRepeatPassword>
type SetSuccessUserActionType = ReturnType<typeof actionsRegistrations.setSuccess>
type SetLoadingUserActionType = ReturnType<typeof actionsRegistrations.setLoading>
type SetErrorUserActionType = ReturnType<typeof actionsRegistrations.setError>
type SetErrServActionType = ReturnType<typeof actionsRegistrations.setErrServ>
type PostRememberUserActionType = ReturnType<typeof actionsRegistrations.postRememberMe>

export type ActionsTypes =
    | SetLoginUserActionType
    | PostPasswordUserActionType
    | PostPassword2UserActionType
    | PostRememberUserActionType
    | SetSuccessUserActionType
    | SetErrorUserActionType
    | SetLoadingUserActionType
    | SetErrServActionType