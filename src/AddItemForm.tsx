import React, { KeyboardEvent, ChangeEvent, FC, RefObject, useRef, useState } from 'react';


type AddItemFormPropsType = {
    maxLengthUserMessage: number;
    addNewItem: (title: string) => void
}


function AddItemForm(
    { maxLengthUserMessage, addNewItem }: AddItemFormPropsType) {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState(false)

    const changeLocalTitile = (e: ChangeEvent<HTMLInputElement>) => {
        // set'aem error only if it exist!
        error && setError(false)
        setTitle(e.currentTarget.value)
        if (title.length > maxLengthUserMessage) { //unneccesary check  
        }
    }

    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle && title.length <= maxLengthUserMessage) {
            addNewItem(trimmedTitle) //send to props!
        } else {
            setError(true)
        }
        setTitle("")
    }

    const onKeyDownAdTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addItem()



    const userErrorMessage = error && <div style={{ color: "hotpink" }} >Title is empty or too long!</div>
    const isUserMessageToLong: boolean = title.length > maxLengthUserMessage
    const isAddBtnDisabled = !title.length || isUserMessageToLong || error
    // const isAddBtnDisabled = title.length === 0
    const userMaxLengthMessage = isUserMessageToLong && <div style={{ color: "pink" }}>task title too long!</div>
    const inputErrorClasses = error || isUserMessageToLong ? "input-error" : ""
    



    return (
        <div>
            {/* <input ref={addTaskInput} />
    <button onClick={addTask}>+</button> */}
            <input
                onKeyDown={onKeyDownAdTask}
                value={title}
                onChange={changeLocalTitile}
                placeholder="Please, Enter the title"
                className={inputErrorClasses}
            // if we have an error or title.length>15
            />

            <button disabled={isAddBtnDisabled} onClick={addItem}>+</button>
            {/* title.trim().length */}


            {userMaxLengthMessage}

            {userErrorMessage}

        </div>

    )




}


export default AddItemForm