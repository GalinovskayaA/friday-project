import React, {useEffect, useState} from 'react';
import s from "./modal.module.css";

type ModalUpType = {
    speed: number // 1 - fast; 100 - slow
}

const ModalUp = ({speed}: ModalUpType) => {
    const [show, setShow] = useState(false);

    const handleScroll = () => {
        if (window.pageYOffset > 300) setShow(true);
        else setShow(false);
    };

    const scroll = () => {
        const step = window.pageYOffset / speed;
        let lastState = window.pageYOffset;

        const innerTimer = setInterval(() => {
            if (lastState < window.pageYOffset) clearInterval(innerTimer);
            lastState = window.pageYOffset;

            window.scroll(0, lastState - step);
            if (window.pageYOffset === 0) clearInterval(innerTimer);
        }, 50);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    }, []);

    if (!show) return null;

    return (
        <div className={s.modalUp} onClick={scroll}>
            UP
        </div>
    );
};

export default ModalUp;