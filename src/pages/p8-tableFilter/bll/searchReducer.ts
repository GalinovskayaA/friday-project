import {Dispatch} from "redux";

export interface IItemsTable {
    id: string;
    itemName: string;
    price: number;
}

export interface IItemsSettings {
    minPrice: number;
    maxPrice: number;
    min: number;
    max: number;

    searchName: string;
    sortProducts: string;

    productTotalCount: number;
    page: number;
    pageCount: number;
}

export interface ITableState {
    tableProducts: {
        items: IItemsTable[];
        settingsSearch: IItemsSettings;
        loading: boolean
    };
}

export const InitialState: ITableState = {
    tableProducts: {
        items: [
            // {itemName: 'qwertt', price: 1220, id: 'qwer1121'},
            // {itemName: 'zxxxtt', price: 1332, id: 'qwer1522'},
            // {itemName: 'zxxxtt', price: 1332, id: 'qwer12523'},
            // {itemName: 'dfdstt', price: 8800, id: 'qwer1224'},
            // {itemName: 'qwertt', price: 1220, id: 'qwer1125'},
            // {itemName: 'zxxxtt', price: 1332, id: 'qwer1526'},
            // {itemName: 'zxxxtt', price: 1332, id: 'qwer12527'},
            // {itemName: 'dfdstt', price: 8800, id: 'qwer1228'},
            // {itemName: 'qwertt', price: 1220, id: 'qwer1129'},
            // {itemName: 'zxxxtt', price: 1332, id: 'qwer1520'},
            // {itemName: 'zxxxtt', price: 1332, id: 'qwer125210'},
            // {itemName: 'dfdstt', price: 8800, id: 'qwer12211'},
            // {itemName: 'qwertt', price: 1220, id: 'qwer11212'},
            // {itemName: 'zxxxtt', price: 1332, id: 'qwer15213'},
            // {itemName: 'zxxxtt', price: 1332, id: 'qwer125214'},
            // {itemName: 'dfdstt', price: 8800, id: 'qwer12215'},
        ],
        settingsSearch: {
            minPrice: 0,
            maxPrice: 1000,
            min: 0,
            max: 1000,

            searchName: '',

            sortProducts: '',

            productTotalCount: 10,
            page: 1,
            pageCount: 10,
        },
        loading: false
    },

};
const SET_SEARCH_NAME = "SET_SEARCH_NAME"
const SET_LOADING = "SET_LOADING"
const SET_MIN_MAX_ITEM = "SET_MIN_MAX_ITEM"
const SET_PAGE_COUNT = "SET_PAGE_COUNT"
const SET_TOTAL_COUNT = "SET_TOTAL_COUNT"
const SET_SORT = "SET_SORT"


export const searchReducer = (state = InitialState, action: any) => {
    switch (action.type) {
        case  SET_SEARCH_NAME: {
            return {
                ...state,
                tableProducts: {
                    ...state.tableProducts,
                    settingsSearch: {
                        ...state.tableProducts.settingsSearch, searchName: action.searchName
                    }
                }
            }
        }
        case SET_LOADING: {
            return {
                ...state,
                tableProducts: {
                    ...state.tableProducts,
                    loading: action.loading
                }
            }
        }
        case SET_MIN_MAX_ITEM: {
            return {
                ...state,
                tableProducts: {
                    ...state.tableProducts,
                    settingsSearch: {
                        ...state.tableProducts.settingsSearch, min: action.min, max: action.max
                    }
                }
            }
        }
        case SET_PAGE_COUNT: {
            return {
                ...state,
                tableProducts: {
                    ...state.tableProducts,
                    settingsSearch: {
                        ...state.tableProducts.settingsSearch,page: action.newPage, pageCount: action.newPageCount
                    }
                }
            }
        }
        case SET_TOTAL_COUNT: {
            return {
                ...state,
                tableProducts: {
                    ...state.tableProducts,
                    settingsSearch: {
                        ...state.tableProducts.settingsSearch,productTotalCount: action.productTotalCount
                    }
                }
            }
        }
        case SET_SORT: {
            return {
                ...state,
                tableProducts: {
                    ...state.tableProducts,
                    settingsSearch: {
                        ...state.tableProducts.settingsSearch,sortProducts: action.sortProducts
                    }
                }
            }
        }
        default:
            return state;
    }
}

export const actionsSearch = {
    setSearchName: (searchName: string) => ({type: SET_SEARCH_NAME, searchName}) as const,
    setLoading: (loading: boolean) => ({type: SET_LOADING, loading}) as const,
    setMinMax:(min: number, max: number) =>({type:SET_MIN_MAX_ITEM, min, max}) as const,
    setPageCount:(newPage:number , newPageCount: number) =>({type:SET_PAGE_COUNT,newPage, newPageCount}) as const,
    setProductTotalCount:(productTotalCount: number) =>({type:SET_TOTAL_COUNT, productTotalCount}) as const,
    setSort:(sortProducts:string) => ({type: SET_SORT, sortProducts}) as const,

}

export const getSearch = (newPage?: number, newPageCount?: number) => {
    return (dispatch: Dispatch) => {
        dispatch(actionsSearch.setLoading(true))
        // console.log('helo')
        // tableApi.getTableItems().then(response=>{
        // })
    }
}
