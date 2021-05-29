import React, {useEffect, useState} from 'react';
import {Range, getTrackBackground} from 'react-range';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../../app/store";
import {actionsSearch} from "../../bll/searchReducer";


const MultiRangeSlider: React.FC = () => {
    const {tableProducts} = useSelector((store: AppRootStateType) => store.search);
    const {minPrice, maxPrice} = tableProducts.settingsSearch;
    const [values, setValues] = useState([minPrice, maxPrice]);

    const dispatch = useDispatch();

    const setGlobalValues = (newValues: number[]) => {
        dispatch(actionsSearch.setMinMax(newValues[0], newValues[1]));
        setValues(newValues);
    };

    useEffect(() => {
        setGlobalValues([minPrice, maxPrice]);
    }, [minPrice, maxPrice]);

    return (
        <Range
            values={values}
            step={1}
            min={minPrice}
            max={maxPrice}
            onChange={values => setGlobalValues(values)}
            renderTrack={({props, children}) => (
                <div
                    onMouseDown={props.onMouseDown}
                    onTouchStart={props.onTouchStart}
                    style={{
                        ...props.style,
                        height: '36px',
                        display: 'flex',
                        width: '90%',
                        margin: '5%',
                    }}
                >
                    <div
                        ref={props.ref}
                        style={{
                            height: '5px',
                            width: '100%',
                            borderRadius: '4px',
                            background: getTrackBackground({
                                values: values,
                                colors: ['#ccc', '#548BF4', '#ccc'],
                                min: minPrice,
                                max: maxPrice
                            }),
                            alignSelf: 'center'
                        }}
                    >
                        {children}
                    </div>
                </div>
            )}
            renderThumb={({index, props, isDragged}) => (
                <div
                    {...props}
                    style={{
                        ...props.style,
                        height: '12px',
                        width: '12px',
                        borderRadius: '1px',
                        backgroundColor: '#FFF',

                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'flex',

                        boxShadow: '0px 2px 6px #AAA',
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: '-28px',
                            color: '#fff',
                            fontWeight: 'bold',
                            fontSize: '14px',
                            fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
                            padding: '4px',
                            borderRadius: '4px',
                            backgroundColor: '#548BF4'
                        }}
                    >
                        {values[index].toFixed(0)}
                    </div>
                    <div style={{height: '16px', width: '5px', backgroundColor: isDragged ? '#548BF4' : '#CCC'}}/>
                </div>
            )}
        />
    );
};

export default MultiRangeSlider;