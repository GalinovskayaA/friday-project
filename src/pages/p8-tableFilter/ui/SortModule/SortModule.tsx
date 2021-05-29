import React, {useState} from 'react';
import {PackType} from "../../../../api/api";
import {useDispatch} from "react-redux";
import {actionsSearch} from "../../bll/searchReducer";
import {getPacksTC} from "../../../p3-packs/bll/packsReducer";

type SortTypeProps = {
    title: string
    arrayData: Array<PackType>
}

const SortModule: React.FC<SortTypeProps> = ({title, arrayData}) => {
    const [btnArrow, setBtnArrow] = useState(0)
    const dispatch = useDispatch();
    const btnStyle = {
        background: 'none',
        border: '1px solid black',
        cursor: 'pointer',
        margin: '0',
        padding: '0'
    }
    const titleStyle = {
        marginRight: '5px',
    }
    const sortItem = (x: number) => {
        setBtnArrow(x)
        dispatch(actionsSearch.setSort(x + 'item'));
        dispatch(getPacksTC())
    }
    const sortIcon = (btnArrow === 0)
        ?  <button style={btnStyle} onClick={() => sortItem(1)}>&#9650;</button>
        :  <button style={btnStyle} onClick={() => sortItem(0)}>&#9660;</button>
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center'
        }}>
            <div style={titleStyle}>{title}</div>
            <div style={{
                display: "flex",
                flexDirection: 'column'
            }
            }>
                {sortIcon}
            </div>
        </div>
    );
};

export default SortModule;