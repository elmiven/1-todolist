import React, { KeyboardEvent, ChangeEvent, FC, RefObject, useRef, useState } from 'react';
import { FilteredValuesType, TasksStateType } from './App';
import TasksList from './Tasklist';

export
    type TodolistPropsType = {
        todoListId: string
        title: string
        tasks: Array<TaskType>
        filter: FilteredValuesType

        removeTask: (todoListId: string, taskId: string) => void
        addTask: (todoListId: string, title: string) => void

        changeTasksStatus: (todoListId: string, taskId: any, isDone: boolean) => void

        changeFilterValue: (todoListId: string, filter: FilteredValuesType,) => void
        removeTodoList: (todoListid: string) => void

        // title: string
        // filter: FilteredValuesType;
        // tasks: TaskType[] //or Array<TaskType> (generic)
        // changeFilterValue: (filter: FilteredValuesType) => void
        // removeTask: (taskId: string) => void
        // addTask: (title: string) => void
        // changeTasksStatus: (taskId: any, isDone: boolean) => void
    }


export
    type TaskType = {
        id: string,
        title: string,
        isDone: boolean,
    }


const TodoList: FC<TodolistPropsType> = (props: TodolistPropsType) => {

    const [title, setTitle] = useState<string>("")

    const [error, setError] = useState<boolean>(false)


    const maxLengthUserMessage = 15
    const isUserMessageToLong = title.length > maxLengthUserMessage

    const inputErrorClasses = error || isUserMessageToLong ? "input-error" : ""
    const userMaxLengthMessage = isUserMessageToLong && <div style={{ color: "pink" }}>task title too long!</div>
    const userErrorMessage = error && <div style={{ color: "hotpink" }} >Title is empty or too long!</div>

    const isAddBtnDisabled = title.length === 0



    // const addTaskInput: RefObject<HTMLInputElement> = useRef(null)
    // const addTask = () => {
    //     if (addTaskInput.current) {
    //         addTaskInput.current && props.addTask(addTaskInput.current.value)
    //     }
    // }


    const changeLocalTitile = (e: ChangeEvent<HTMLInputElement>) => {
        // set'aem error only if it exist!
        error && setError(false)
        setTitle(e.currentTarget.value)
        if (title.length > maxLengthUserMessage) {

        }
    }



    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle && title.length <= maxLengthUserMessage) {
            props.addTask(props.todoListId, trimmedTitle)
        } else {
            setTitle("")
            setError(true)
        }
    }




    const onKeyDownAdTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addTask()



    //fn that returns another function (closure)
    const handlerCreator = (filter: FilteredValuesType) => {
        return () => props.changeFilterValue(props.todoListId, filter)
    }

    // const setAllFilterValue = handlerCreator("all")
    // const setActiveFilterValue = handlerCreator("active")
    // const setCompletedFilterValue = handlerCreator("completed")






    // const tasksItems: JSX.Element[] | JSX.Element = props.tasks.length
    //     ? props.tasks.map((task: TaskType) => {
    //         return (
    //             <li>
    //                 <input type="checkbox" checked={task.isDone} />
    //                 <span>{task.title}</span>
    //             </li>
    //         )
    //     })р
    //     : <span>your task list is empty</span>

    const removeTodoListhandler = () => {
        props.removeTodoList(props.todoListId)
    }

    return (
        <div className={"todolist"}>



            <h3>
                {props.title}
                <button onClick={removeTodoListhandler}>x</button>
            </h3>
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

                <button disabled={isAddBtnDisabled} onClick={addTask}>+</button>
                {/* title.trim().length */}


                {userMaxLengthMessage}

                {userErrorMessage}

            </div>


            {/* <ul>
                    <li>
                        <input type="checkbox" checked={props.tasks[1].isDone}/> 
                        <span>{props.tasks[1].title}</span>
                    </li>

                    {tasksItems}
                </ul> */}

            <TasksList
                todoListsId={props.todoListId}
                tasks={props.tasks}
                removeTask={props.removeTask}
                changeTasksStatus={props.changeTasksStatus}
            />


            <div className="filter-btn-container">
                <button
                    onClick={handlerCreator("all")}
                    className={props.filter === "all" ? "active-filter" : "filter-btn"}>
                    All
                </button>
                <button
                    onClick={handlerCreator("active")}
                    className={props.filter === "active" ? "active-filter" : "filter-btn"}>
                    Active
                </button>
                <button
                    onClick={handlerCreator("completed")}
                    className={props.filter === "completed" ? "active-filter" : "filter-btn"}>
                    Completed
                </button>

            </div>

        </div>

    );
};

export default TodoList;