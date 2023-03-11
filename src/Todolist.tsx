import React, { KeyboardEvent, ChangeEvent, FC, RefObject, useRef, useState } from 'react';
import AddItemForm from './AddItemForm';
import { FilteredValuesType, TasksStateType } from './App';
import EditableSpan from './EditableSpan ';
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
        changeTaskTitle: (TodolistId: string, taskId: string, newTitle: string) => void

        changeFilterValue: (todoListId: string, filter: FilteredValuesType,) => void
        removeTodoList: (todoListid: string) => void

        changeTodolistTitle: (todoListId: string, title: string) => void

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



    const maxLengthUserMessage = 15
    





    // const addTaskInput: RefObject<HTMLInputElement> = useRef(null)
    // const addTask = () => {
    //     if (addTaskInput.current) {
    //         addTaskInput.current && props.addTask(addTaskInput.current.value)
    //     }
    // }


 


    const addTask = (title: string) => {
        props.addTask(props.todoListId, title)
        // const trimmedTitle = title.trim()
        // if (trimmedTitle && title.length <= maxLengthUserMessage) {
        //     props.addTask(props.todoListId, trimmedTitle)
        // } else {
        //     setTitle("")
        //     setError(true)
        // }
    }




    


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

    const ChangeTodolistTitleHandler = (title: string) => {
        props.changeTodolistTitle(props.todoListId, title)
    }


    return (
        <div className={"todolist"}>
            <h3>
                <EditableSpan title={props.title} changeTitle={ChangeTodolistTitleHandler} />
                {/*  */}
                <button onClick={removeTodoListhandler}>x</button>
            </h3>
            <AddItemForm maxLengthUserMessage={15} addNewItem={addTask}/>


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
                changeTaskTitle={props.changeTaskTitle}
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