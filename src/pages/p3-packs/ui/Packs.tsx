import React, {useEffect, useState} from 'react'
import {Redirect} from 'react-router-dom'
import s from './table.module.css'
import {PATH} from "../../../components/routes/Routes";
import {useDispatch, useSelector} from "react-redux";
import {addPackTC, getPacksTC} from "../bll/packsReducer";
import {getAuthUserDataTC, setIsRedirectAC} from "../../p1-login/bll/loginReducer";
import {AppRootStateType} from "../../../app/store";
import {Pack} from "./Pack/Pack";
import {PackType} from "../../../api/api";
import SearchTable from "../../p8-tableFilter/ui/SearchTable";
import Pagination from "../../p8-tableFilter/ui/Pagination/Pagination";
import {actionsSearch} from "../../p8-tableFilter/bll/searchReducer";
import SortModule from "../../p8-tableFilter/ui/SortModule/SortModule";
import Preloader from "../../../components/preloader/Preloader";
import ModalUpdateContainer from "../../../components/Modals/ModalUpdatePack";

export const Packs = () => {
    const dispatch = useDispatch()

    const isAuth = useSelector<AppRootStateType, boolean>(state => state.login.isAuth)
    const isRedirect = useSelector<AppRootStateType, boolean>(state => state.login.isRedirect)
    const status = useSelector<AppRootStateType, boolean>(state => state.recoverPassword.status)
    const packs = useSelector<AppRootStateType, Array<PackType>>(state => state.packs.cardPacks)
    const errorText = useSelector<AppRootStateType, string>(state => state.login.errorText)
  //  let [redirect, setRedirect] = useState<boolean>(false) // перенести на другую страницу
    let [wait, setWait] = useState<boolean>(true) // показать ошибку
    let [name, setName] = useState<string>('')

    const {
        page,
        pageCount,
        productTotalCount
    } = useSelector((state: AppRootStateType) => state.search.tableProducts.settingsSearch)

    useEffect(() => {
        if (isAuth) {
            dispatch(getPacksTC())
            setWait(false)
            return
        } else {
            setTimeout(() => dispatch(setIsRedirectAC(true)), 2500)
        }
        dispatch(getAuthUserDataTC())
    }, [isAuth, dispatch])

  //  if (!isAuth) setTimeout(() => setRedirect(true), 2000);
    /*if (redirect) return <Redirect to={PATH.LOGIN}/>*/
    if (isRedirect) return <Redirect to={PATH.LOGIN}/>
    if (wait) return <div className={s.errorText}> {errorText} </div>

    const newPacks = packs.map((p) => {
        const date = (new Date(p.updated)).toLocaleDateString() //возможность менять тип даты
        return <Pack key={p._id} pack={p} packDate={date}/>
    })

    const onChange = (value: string) => {
        setName(value)
    }

    const getPage = (newPage: number, newPageCount: number) => {
        dispatch(actionsSearch.setPageCount(newPage, newPageCount))
        dispatch(getPacksTC(newPage, newPageCount))
    };

    const onBtnAddPack = (name: string) => {
        dispatch(addPackTC(name))
        setName('')
    }

    return (
        <>
            <div className={s.preloader}>{status ? <Preloader/> : ""}</div>
            {/*// крутилка*/}
            <h3>Packs page</h3>
            <SearchTable/>
            table
            <div className={s.table}>
                <div className={s.tableHeader}>
                    <div className={s.tableHeader_packsName}>Name</div>
                    <div className={s.tableHeader_cardsCount}><SortModule arrayData={packs} title={'CardsCount'}/></div>
                    <div className={s.tableHeader_updated}>Updated</div>
                    <div className={s.tableHeader_user}>User Name</div>
                    <div className={s.tableHeader_buttonAdd}>
                        <ModalUpdateContainer modalName={'add'} onButtonModal={onBtnAddPack}
                                              value={name} onChange={onChange}
                                              title={'Enter pack name'} buttonTrue={'Enter'}/>
                    </div>
                </div>
                {newPacks}
                <div style={{
                    width: '100%'
                }}><Pagination page={page} pageCount={pageCount} productTotalCount={productTotalCount}
                               getPage={getPage}/></div>
            </div>
        </>
    )
}