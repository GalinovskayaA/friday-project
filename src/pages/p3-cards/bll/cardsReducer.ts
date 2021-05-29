import {CardType, commonAPI} from "../../../api/api";
import {AppRootStateType} from "../../../app/store";
import {ThunkDispatch} from "redux-thunk";


const initialState = {
    cards: [] as Array<CardType>,
    packUserId: '',
    cardsTotalCount: 0,
    page: 1,
    pageCount: 10,
    error: ''
}

export const cardsReducer = (state: initialStateType = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case 'CARDS/SET-CARDS': {
            return {
                ...state,
                cards: action.cards,
                packUserId: action.packUserId,
                page: action.page,
                cardsTotalCount: action.cardsTotalCount,
                pageCount: action.pageCount
            }
        }
        case 'CARDS/SET-CARDS_GRADE': {
            return {
                ...state,
                cards: state.cards.map(c => c._id === action.cardId ? {...c, grade: action.grade} : c)
            }
        }
        default:
            return state
    }
}

//action creators

export const setCardsAC = (cards: Array<CardType>, packUserId: string,
                           page: number, cardsTotalCount: number, pageCount: number) =>
    ({type: 'CARDS/SET-CARDS', cards, packUserId, page, cardsTotalCount, pageCount} as const)

export const setCardsGradeAC = (grade: number, cardId: string) => ({
    type: 'CARDS/SET-CARDS_GRADE',
    grade,
    cardId
} as const)


//thunk

export const getCardTC = (packId: string) => (dispatch: ThunkDispatch<AppRootStateType, void, ActionsType>) => {
    commonAPI.getCards(packId)
        .then((res) => {
            console.log(res);
            dispatch(setCardsAC(res.data.cards, res.data.packUserId, res.data.page, res.data.cardsTotalCount, res.data.pageCount))
        })
        .catch(e => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console')
            console.log(error);
        })
}

export const addCardTC = (packId: string, question?: string, answer?: string) => (dispatch: ThunkDispatch<AppRootStateType, void, ActionsType>) => {
    commonAPI.addCard(packId, question, answer)
        .then(() => {

            dispatch(getCardTC(packId))

        })
        .catch(e => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console')
            console.log(error);
        })
}

export const deleteCardTC = (packId: string, cardId: string) => (dispatch: ThunkDispatch<AppRootStateType, void, ActionsType>) => {
    commonAPI.deleteCard(cardId)
        .then(() => {
            dispatch(getCardTC(packId))
        })
        .catch(e => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console')
            console.log(error);

        })
}

export const updateCardTC = (packId: string, cardId: string, question?: string, answer?: string) => (dispatch: ThunkDispatch<AppRootStateType, void, ActionsType>) => {
    commonAPI.updateCard(cardId, question, answer)
        .then(() => {
            dispatch(getCardTC(packId))
        })
        .catch(e => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console')
            console.log(error);

        })
}

export const updateGradeCardTC = (cardId: string, grade: number, packId: string) => (dispatch: ThunkDispatch<AppRootStateType, void, ActionsType>) => {
    commonAPI.updateGrade(grade, cardId)
        .then(({data}) => {
            dispatch(setCardsGradeAC(data.grade, data.card_id))
        })
        .catch(e => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console')
            console.log(error);

        })
}


//types
export type initialStateType = typeof initialState
export type ActionsType =
    | ReturnType<typeof setCardsAC>
    | ReturnType<typeof setCardsGradeAC>

