import React, { KeyboardEvent, ChangeEvent, FC, RefObject, useRef, useState } from 'react';


type EditableSpanPropsType = {
    title: string
    changeTitle: (newTitle: string) => void
    spanClasses?: string
    inputClasses?: string
}


function EditableSpan({
    title,
    changeTitle,
    spanClasses
}: EditableSpanPropsType) {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [localTitle, setLocalTitle] = useState<string>(title)

    const changeLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        // error && setDefaultResultOrder(false)
        setLocalTitle(e.currentTarget.value)
    }

    const onEditMode = () => {
        setEditMode(true)
        
    }

    const offEditMode = () => {
        setEditMode(false)
        changeTitle(localTitle)
    }


    return (
        editMode
            ? <input
                value={localTitle}
                onChange={changeLocalTitle}
                onBlur={offEditMode}
                autoFocus
            />
            : <span
                className = {spanClasses}
                onDoubleClick = {onEditMode}
            >{title}</span>

    )



}




export default EditableSpan