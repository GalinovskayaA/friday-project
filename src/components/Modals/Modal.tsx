import React, {ReactNode} from 'react';
import s from './modal.module.css'

type ModalType = {
    enableBackground?: boolean;
    backgroundOnClick?: () => void;
    modalOnClick?: () => void;

    show: boolean
    children: ReactNode
}

const Modal = ({
        enableBackground, backgroundOnClick = () => {},
        modalOnClick = () => {},
        show, children,
    }: ModalType) => {

    if (!show) return null;

    return (
        <div className={s.content}>
            {enableBackground && <div className={s.background} onClick={backgroundOnClick} />}
            <div className={s.modal} onClick={modalOnClick}>
                {children}
            </div>
        </div>
    );
};

export default Modal;