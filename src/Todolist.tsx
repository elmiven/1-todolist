import React, { FC } from 'react';



type TodolistPropsType = {
    title: string,
    tasks: TaskType[] //Array<TaskType>
}


export 
type TaskType = {
    id: number,
    title: string,
    isDone: boolean,
}



const TodoList: FC<TodolistPropsType> = (props: TodolistPropsType) => {

    const tasksItems: JSX.Element[] | JSX.Element = props.tasks.length
        ? props.tasks.map((task: TaskType) => {
            return (
                <li>
                    <input type="checkbox" checked={task.isDone} />
                    <span>{task.title}</span>
                </li>
            )
        })
        : <span>your task list is empty</span>


    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input />
                    <button>+</button>
                </div>
                <ul>

                    {/* <li>
                        <input type="checkbox" checked={props.tasks[1].isDone}/> 
                        <span>{props.tasks[1].title}</span>
                        </li>
                    <li> */}
                    {tasksItems}
                </ul>
       
                <div>
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>
        </div>



    );
};

export default TodoList;