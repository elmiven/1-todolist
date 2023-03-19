import React, { KeyboardEvent, ChangeEvent, FC, RefObject, useRef, useState } from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { createMuiTheme, makeStyles } from '@mui/material/styles';

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
            <TextField
            
            id="standard-helperText"
            label={
                <Typography component="h3">  </Typography>
              }
            variant="standard"
            onKeyDown={onKeyDownAdTask}
            value={title}
            onChange={changeLocalTitile}
            placeholder="Please, Enter the title"
            className={inputErrorClasses}
            sx={{ paddingTop: 0.0, margin: 0, 
            "& .MuiInputBase-root": {
                height: 15, LabelfontSize:13
            },   "& .MuiFormControlLabel-label": {
                fontSize: "3.5rem",
                width: 300,
                backgroundColor: 'rgba(110,0,0,0.1)'
              } }}
            error={!!error}
            size="small"
            />
            {/* <input
                onKeyDown={onKeyDownAdTask}
                value={title}
                onChange={changeLocalTitile}
                placeholder="Please, Enter the title"
                className={inputErrorClasses}
            // if we have an error or title.length>15
            /> */}

            {/* <button disabled={isAddBtnDisabled} onClick={addItem}>+</button> */}
            <IconButton
                sx={{ padding: 0, margin: 0 }}
                onClick={addItem}
                disabled={isAddBtnDisabled}>
                <AddBoxIcon />
            </IconButton>

            {/* title.trim().length */}


            {userMaxLengthMessage}

            {userErrorMessage}

        </div>

    )




}


export default AddItemForm