import React, {FC} from 'react';
import {TaskType} from "./Todolist";

type TasksListPropsType = {
    tasks: TaskType[]
    removeTask: (taskId: number) => void
}

const TasksList: FC<TasksListPropsType> = (props): JSX.Element => {
    const tasksItems: JSX.Element[] | JSX.Element =
        props.tasks.length
        ? props.tasks.map((task)=> {
            return (
                <li key={task.id}>
                    <input type="checkbox" checked={task.isDone}/>
                    <span>{task.title}</span>
                    <button onClick ={ () => props.removeTask(task.id)}>x</button>
                </li>
            )
        })
        : <span>Your taskslist is empty</span>

        
    return (
        <ul>
            {tasksItems}
        </ul>
    );
};

export default TasksList;