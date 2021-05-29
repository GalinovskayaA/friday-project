import {initialState} from "../../../p3-packs/bll/packsReducer";



const SET_SEARCH_NAME = "SET_SEARCH_NAME"
const SET_LOADING = "SET_LOADING"
const SET_MIN_MAX_ITEM = "SET_MIN_MAX_ITEM"
const SET_PAGE_COUNT = "SET_PAGE_COUNT"
const SET_PRODUCT_TOTAL_COUNT = "SET_PRODUCT_TOTAL_COUNT"


export const searchReducer = (state = initialState, action: any) => {
    switch (action.type) {

        default:
            return state;
    }
}

export const actionsSearch = {

    setProductTotalCount:(productTotalCount: number) =>({type:SET_PRODUCT_TOTAL_COUNT, productTotalCount}) as const

}
