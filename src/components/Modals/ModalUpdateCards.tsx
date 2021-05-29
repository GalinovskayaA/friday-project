import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from "./modal.module.css";
import Modal from "./Modal";


type ModalQuestionPropsType = {
    modalName: string
    onButtonModal: (value: string, value2?: string) => void
    onChange?: (question: string) => void
    onChange2?: (answer: string) => void
    question: string
    answer: string
    buttonTrue?: string
    buttonFalse?: string
    title?: string
    disabled?: boolean
}

const ModalUpdateCards = (
    { modalName, onButtonModal, question, answer,
        onChange, onChange2, buttonTrue, buttonFalse, title, disabled
    }: ModalQuestionPropsType) => {

    const [show, setShow] = useState(false);
    const [, setUpdate] = useState(false);

    const setTrue = (question: string, answer: string) => {
        onButtonModal(question, answer)
        setShow(false);
    };
    const setFalse = () => {
        setUpdate(false);
        setShow(false);
    };
    const onChangeQuestion = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e.currentTarget.value);
    }
    const onChangeAnswer = (e: ChangeEvent<HTMLInputElement>) => {
        onChange2 && onChange2(e.currentTarget.value);
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setTrue(question, answer)
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
                {title ? title : 'question and answer Modal'}
                <div className={s.content}>
                    <div className={s.inputsUpdate}>
                        <input value={question} autoFocus onChange={onChangeQuestion} onKeyDown={onKeyPressHandler}/>
                        <input value={answer} onChange={onChangeAnswer} onKeyDown={onKeyPressHandler}/>
                    </div>
                    <div className={s.buttonsUpdate}>
                        <button onClick={() => setTrue(question, answer)} className={s.buttonUpdate}>{buttonTrue || "Yes"}</button>
                        <button onClick={setFalse} className={s.buttonUpdate}>{buttonFalse || "Cancel"}</button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ModalUpdateCards;