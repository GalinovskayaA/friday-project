import {commonAPI, PackType} from "../../../api/api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../../app/store";
import {actionsSearch} from "../../p8-tableFilter/bll/searchReducer";
import {ThunkDispatch} from "redux-thunk";
import {setStatusAC, setStatusActionType} from "../../p5-recoverPassword/bll/recoverPasswordReducer";

export const initialState = {
    cardPacks: [] as Array<PackType>,
    packId: ''
}

export const packsReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case'packs/SET-PACKS':
            return {...state, cardPacks: action.packs}
        case'packs/SET-PACKID':
            return {...state, packId: action.id}

        default:
            return state
    }
};

//AC
export const setPacksAC = (packs: Array<PackType>) => ({type: 'packs/SET-PACKS', packs} as const)
export const setPackIdAC = (id: string) => ({type: 'packs/SET-PACKID', id} as const)
export type GetStore = () => AppRootStateType

//thunk
export const getPacksTC = (newPage?: number, newPageCount?: number) => (dispatch: Dispatch, getStore: GetStore) => {
    const {min, max, searchName, page, pageCount, sortProducts} = getStore().search.tableProducts.settingsSearch
    dispatch(setStatusAC(true))
    commonAPI.getPacks(min, max, searchName, newPage || page, newPageCount || pageCount, sortProducts)
        .then(res => {
            dispatch(setPacksAC(res.data.cardPacks))
            dispatch(actionsSearch.setProductTotalCount(res.data.cardPacksTotalCount))
        })
        .catch(err => {
            console.log('some err in getPacks');
        })
        .finally(() => {
            dispatch(setStatusAC(false))
        })
}

export const addPackTC = (name?: string) => (dispatch: ThunkDispatch<AppRootStateType, void, setPacksACType>) => {
    commonAPI.addPack(name)
        .then(() => {
            dispatch(getPacksTC())
        })
        .catch(e => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console')
            console.log(error);
        })
}
export const deletePackTC = (packId: string) => (dispatch: ThunkDispatch<AppRootStateType, void, setPacksACType>) => {
    commonAPI.deletePack(packId)
        .then(() => {
            dispatch(getPacksTC())
        })
        .catch(e => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console')
            console.log(error);

        })
}

export const updatePackTC = (packId: string, name: string) => (dispatch: ThunkDispatch<AppRootStateType, void, setPacksACType>) => {
    commonAPI.updatePack(packId, name)
        .then(() => {
            dispatch(getPacksTC())
        })
        .catch(e => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console')
            console.log(error);

        })
}


//types
type InitialStateType = typeof initialState
type ActionsTypes = setPacksACType | setStatusActionType | setPackIdACType
type setPacksACType = ReturnType<typeof setPacksAC>
type setPackIdACType = ReturnType<typeof setPackIdAC>

