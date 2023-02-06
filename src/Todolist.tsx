import React, { FC } from 'react';
import { FilteredValuesType } from './App';
import TasksList from './Tasklist';

type TodolistPropsType = {
    title: string
    tasks: TaskType[] //or Array<TaskType> (generic)
    changeFilterValue: (filter: FilteredValuesType) => void
    removeTask: (taskId: number) => void
}


export
    type TaskType = {
        id: number,
        title: string,
        isDone: boolean,
    }


const TodoList: FC<TodolistPropsType> = (props: TodolistPropsType) => {


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
                <input />
                <button>+</button>
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
                <button onClick ={ ()=> props.changeFilterValue("all")  } >All</button>
                <button onClick ={ ()=> props.changeFilterValue("active")  } >Active</button>
                <button onClick ={ ()=> props.changeFilterValue("completed")  } >Completed</button>

            </div>

        </div>

    );
};

export default TodoList;