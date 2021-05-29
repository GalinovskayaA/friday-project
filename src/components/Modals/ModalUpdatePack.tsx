import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from "./modal.module.css";
import Modal from "./Modal";


type ModalQuestionPropsType = {
    modalName: string
    onButtonModal: (value: string) => void
    onChange?: (name: string) => void
    value: string
    buttonTrue?: string
    buttonFalse?: string
    title?: string
    disabled?: boolean
}

const ModalUpdatePack = ({ modalName, onButtonModal, value,
        onChange, buttonTrue, buttonFalse, title, disabled }: ModalQuestionPropsType) => {

    const [show, setShow] = useState(false);
    const [, setUpdate] = useState(false);

    const setTrue = (value: string) => {
        onButtonModal(value)
        setShow(false);
    };
    const setFalse = () => {
        setUpdate(false);
        setShow(false);
    };
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e.currentTarget.value);
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setTrue(value)
        }
        if (e.key === "Escape") {
            setFalse()
        }
    }

    return (
        <>
            <div>
                <button onClick={() => setShow(true)} disabled={disabled}>{modalName}</button>
            </div>
            <Modal enableBackground backgroundOnClick={() => setShow(false)} show={show}>
                {title ? title : 'question Modal'}
                <div className={s.content}>
                    <div className={s.inputsUpdate}>
                        <input value={value} autoFocus onChange={onChangeCallback}
                               onKeyDown={onKeyPressHandler}/>
                    </div>
                    <div className={s.buttonsUpdate}>
                        <button onClick={() => setTrue(value)} className={s.buttonUpdate}>{buttonTrue || "Yes"}</button>
                        <button onClick={setFalse} className={s.buttonUpdate}>{buttonFalse || "Cancel"}</button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ModalUpdatePack;