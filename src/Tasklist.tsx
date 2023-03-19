import React, { ChangeEvent, FC, HTMLAttributes } from 'react';
import EditableSpan from './EditableSpan ';
import { TaskType } from "./Todolist";
import ClearIcon from '@mui/icons-material/Clear';
import { pink, red } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';



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
                    <ListItem key={task.id}
                        disablePadding
                        divider
                        secondaryAction={
                            <IconButton
                                size="small"
                                sx={{ padding: 0, margin: 0, color: pink[800],
                                    '&.Mui-checked': {
                                      color: red[900],
                                    }, }}
                                onClick={removeTaskHandler}>
                                <ClearIcon />
                            </IconButton>
                        }


                    >
                        <Checkbox
                            sx={{ padding: 0, margin: 0 }}
                            
                            // type="checkbox"
                            checked={task.isDone}
                            onChange={changeTasksStatusHandler}
                        />

                        {/* <span className={`task ${task.isDone ? "task-done" : ""}`}>{task.title}</span> */}
                        {/* <span className={taskClasses.join(" ")}>{task.title}</span> */}
                        <EditableSpan title={task.title} changeTitle={changeTaskTitleHandler} spanClasses={`task ${task.isDone ? "task-done" : ""}`} />
                        {/* <button onClick={removeTaskHandler}>x</button> */}

                    </ListItem>
                )
            })

            : <span>no tasks to show :( </span>


    return (
        <List>
            {tasksItems}
        </List>
    );
};

export default TasksList;




