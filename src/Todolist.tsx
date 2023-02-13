import React, { KeyboardEvent, ChangeEvent, FC, RefObject, useRef, useState } from 'react';
import { FilteredValuesType } from './App';
import TasksList from './Tasklist';

export
type TodolistPropsType = {
    title: string
    tasks: TaskType[] //or Array<TaskType> (generic)
    changeFilterValue: (filter: FilteredValuesType) => void
    removeTask: (taskId: string) => void
    addTask: (title: string) => void
}


export
    type TaskType = {
        id: string,
        title: string,
        isDone: boolean,
    }


const TodoList: FC<TodolistPropsType> = (props: TodolistPropsType) => {

    const [title, setTitle] = useState<string>("")

    // const addTaskInput: RefObject<HTMLInputElement> = useRef(null)
    // const addTask = () => {
    //     if (addTaskInput.current) {
    //         addTaskInput.current && props.addTask(addTaskInput.current.value)
    //     }
    // }


const changeLocalTitile = (e: ChangeEvent<HTMLInputElement>) => { setTitle(e.currentTarget.value) }

const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(title)
        }
        setTitle("")
    }



  const onKeyDownAdTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addTask()

  const setAllFilterValue = () => props.changeFilterValue("all")
  const setActiveFilterValue= () => props.changeFilterValue("active")
  const setCompletedFilterValue = () => props.changeFilterValue("completed")

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



    return (
        <div className={"todolist"}>



            <h3>{props.title}</h3>
            <div>
                {/* <input ref={addTaskInput} />
                <button onClick={addTask}>+</button> */}
                <input
                    onKeyDown={onKeyDownAdTask}
                    value={title}
                    onChange={changeLocalTitile} />
                <button disabled={title.trim().length === 0} onClick={addTask}>+</button>
                {title.length > 15 && <div style={{ color: "pink" }}>task title too long!</div>}

            </div>


            {/* <ul>
                    <li>
                        <input type="checkbox" checked={props.tasks[1].isDone}/> 
                        <span>{props.tasks[1].title}</span>
                    </li>

                    {tasksItems}
                </ul> */}

            <TasksList tasks={props.tasks} removeTask={props.removeTask} />


            <div>
                <button onClick={setAllFilterValue} >All</button>
                <button onClick={setActiveFilterValue} >Active</button>
                <button onClick={setCompletedFilterValue} >Completed</button>

            </div>

        </div>

    );
};

export default TodoList;