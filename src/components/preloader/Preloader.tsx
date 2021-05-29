import React from 'react'
import s from './preloader.module.css'
import nya from './PYh.gif'


const Preloader = () => {

    return (
        <div className={s.preloader}> {<img src={nya} alt={''}/>} </div>
    )
}

export default Preloader