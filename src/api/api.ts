import axios from 'axios'
import {LoginParamsType, loginResponseType} from "../pages/p1-login/bll/loginReducer";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
})
// baseURL: 'https://neko-back.herokuapp.com/2.0/'
//http://localhost:7542/2.0/

export const commonAPI = {
    login(data: LoginParamsType) {
        return instance.post<loginResponseType>(('auth/login'), data)
    },
    logOut() {
        return instance.delete(`auth/me`)
    },
    authMe() {
        return instance.post<loginResponseType>(`auth/me`) // проверка на залогиненность
    },
    signup(login: string, password: string) {
        return instance.post(`/auth/register/`, {
            'email': login, 'password': password
        })
    },
    recoverPassword(email: string, from: string, message: string) {
        return instance.post<ResponseType>('auth/forgot', {email, from, message});
    },
    changePassword(newPassword: string, token: string | undefined) {
        return instance.post('auth/set-new-password', {password: newPassword, resetPasswordToken: token})
    },

    //packs

    getPacks(min: number, max: number, searchName: string, page?: number, pageCount?: number, sortProducts?: string) {
        return instance.get<getPacksResponseType>(`cards/pack?`
            + (max ? `min=${min}&max=${max}&` : '')
            + (searchName.length > 0 ? `packName=${searchName}&` : '')
            + (page ? `page=${page}&pageCount=${pageCount}&` : '')
            + (sortProducts ? `sortProducts=${sortProducts}&` : ''))

    },
    addPack(name?: string) {
        return instance.post(`cards/pack`, {cardsPack: {name: name || 'new test pack'}})
    },
    deletePack(packId: string) {
        return instance.delete(`cards/pack?id=${packId}`)
    },
    updatePack(packId: string, name?: string) {
        return instance.put(`cards/pack`, {cardsPack: {_id: packId, name: name || 'no name'}})
    },

    //cards

    getCards(packId: string, question?: string, answer?: string, min?: string, max?: string, page?: number, pageCount?: number) {
        return instance.get<GetCardsResponseType>(`cards/card`, {
            params: {
                cardsPack_id: packId,
                cardQuestion: question,
                cardAnswer: answer,
                min,
                max,
                page,
                pageCount
            }
        })
    },
    addCard(id: string, question?: string, answer?: string) {
        return instance.post(`cards/card`, {card: {cardsPack_id: id, question: question, answer: answer}})
    },
    deleteCard(cardId: string) {
        return instance.delete(`cards/card?id=${cardId}`)
    },
    updateCard(id: string, question?: string, answer?: string) {
        return instance.put(`cards/card`, {card: {_id: id, question: question, answer: answer}})
    },
    updateGrade(grade: number, cardId: string) {
        return instance.put<updateGradeResponseType>(`cards/grade`, {grade, card_id: cardId})
    }
}


//types
type ResponseType = {
    info: string
    error: ErrorType
}
type ErrorType = {
    error: string
    email: string
    emailRegExp: {}
    in: string
}
type getPacksResponseType = {
    cardPacks: Array<PackType>
    cardPacksTotalCount: number// количество колод
    maxCardsCount: number
    minCardsCount: number
    page: number// выбранная страница
    pageCount: number // количество элементов на странице
    token: string
    tokenDeathTime: number
}
export type PackType = {
    cardsCount: number
    created: string
    grade: number
    more_id: string
    name: string
    path: string
    private: boolean
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    user_name: string
    __v: number
    _id: string
}

export type GetCardsResponseType = {
    cards: Array<CardType>
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}
export type CardType = {
    _id: string
    question: string
    answer: string
    cardsPack_id: string
    grade: number
    rating: number
    shots: number
    type: string
    user_id: string
    created: string
    updated: string
    comments: string
}
type updateGradeResponseType = {
    _id: string
    cardsPack_id: string
    card_id: string
    user_id: string
    grade: number
    shots: number
}