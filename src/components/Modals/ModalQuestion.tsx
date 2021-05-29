import React, {KeyboardEvent, useState} from 'react';
import s from "./modal.module.css";
import Modal from "./Modal";

type ModalQuestionPropsType = {
    modalName: string
    disabled?: boolean
    onButtonModal: () => void
}

const ModalQuestion = ({modalName, disabled, onButtonModal}: ModalQuestionPropsType) => {
    const [show, setShow] = useState(false);
    const [, setAnswer] = useState(false);

    const setTrue = () => {
        onButtonModal()
        setShow(false);
    };
    const setFalse = () => {
        setAnswer(false);
        setShow(false);
    };
    const onKeyPressHandler = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") {
            onButtonModal();
            setShow(false);
        }
        if (e.key === "Backspace" || "Escape") {
            setAnswer(false);
            setShow(false);
        }
    }
    const title = "Are you sure you want to?"

    return (
        <>
            <div>
                <button onClick={() => setShow(true)} disabled={disabled}>{modalName}</button>
            </div>
            <Modal
                enableBackground
                backgroundOnClick={() => setShow(false)}
                show={show}

            >
                {title}
                <div className={s.buttonsQuestion}>
                    <input type='button' value='Yes' autoFocus
                           onKeyPress={onKeyPressHandler} onClick={setTrue} className={s.buttonQuestion}/>
                    <input type='button' value='No' autoFocus
                           onKeyDown={onKeyPressHandler} onClick={setFalse} className={s.buttonQuestion}/>
                </div>
            </Modal>
        </>
    );
};

export default ModalQuestion;