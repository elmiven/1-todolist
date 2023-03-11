import React, { ChangeEvent, FC, HTMLAttributes } from 'react';
import EditableSpan from './EditableSpan ';
import { TaskType } from "./Todolist";

type TasksListPropsType = {
    todoListsId: string
    tasks: TaskType[]
    removeTask: (todoListId: string, taskId: string) => void
    changeTasksStatus: (todoListId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (TodolistId: string, taskId: string, newTitle: string) => void

}

const TasksList: FC<TasksListPropsType> = (props): JSX.Element => {






    const tasksItems: JSX.Element[] | JSX.Element =
        props.tasks.length
            ? props.tasks.map((task) => {

                const taskClasses = ["task"]
                task.isDone && taskClasses.push("task-done")

                const removeTaskHandler = () => props.removeTask(props.todoListsId, task.id)

                const changeTasksStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    props.changeTasksStatus(props.todoListsId, task.id, e.currentTarget.checked)
                }


                const changeTaskTitleHandler = (title: string) => {
                    props.changeTaskTitle(props.todoListsId, task.id, title)

                }


                return (
                    <li key={task.id}>
                        <input
                            type="checkbox"
                            checked={task.isDone}
                            onChange={changeTasksStatusHandler}
                        />

                        {/* <span className={`task ${task.isDone ? "task-done" : ""}`}>{task.title}</span> */}
                        {/* <span className={taskClasses.join(" ")}>{task.title}</span> */}
                        <EditableSpan title={task.title} changeTitle={changeTaskTitleHandler} spanClasses={`task ${task.isDone ? "task-done" : ""}`} />
                        <button onClick={removeTaskHandler}>x</button>
                    </li>
                )
            })

            : <span>no tasks to show :( </span>


    return (
        <ul>
            {tasksItems}
        </ul>
    );
};

export default TasksList;




