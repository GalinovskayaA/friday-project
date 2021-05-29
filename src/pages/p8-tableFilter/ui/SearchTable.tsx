import React from 'react';
import s from './search.module.css'
import {actionsSearch} from "../bll/searchReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../app/store";
import MultiRangeSlider from "./MultiRangeSlider/MultiRangeSlider";
import {getPacksTC} from "../../p3-packs/bll/packsReducer";


const SearchTable = () => {
    const dispatch = useDispatch()
    const {tableProducts} = useSelector((state: AppRootStateType) => state.search)
    const tableSearch = (searchName: string) => {
        dispatch(actionsSearch.setSearchName(searchName))
    }

    const getResult = () => {
        dispatch(getPacksTC())
    }

    return (
        <div className={s.searchTable}>
            <div>
                <input className={s.inputSearch}
                       value={tableProducts.settingsSearch.searchName}
                       onChange={(e) => tableSearch(e.currentTarget.value)} type="text"
                       placeholder={'Введите значение для поиска'}
                />
            </div>
            <div style={{
                width: "50%"
            }}><MultiRangeSlider/></div>
            <div>
                <button onClick={getResult}>Поиск (Search)</button>
            </div>

        </div>
    );
};


export default SearchTable