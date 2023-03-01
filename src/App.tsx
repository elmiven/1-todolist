import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import TodoList, { TaskType } from './Todolist';


export type FilteredValuesType = "all" | "active" | "completed"

function App(): JSX.Element {
    // BLL:
    const todoListTitle: string = "What to learn";

    // const tasks: Array<TaskType> = [
    //     { id: 1, title: "HTML & CSS", isDone: true },
    //     { id: 2, title: "ES6 & TS", isDone: false },
    //     { id: 2, title: "React & Redux", isDone: false },
    // ]



    const [tasks, setTasks] = useState<Array<TaskType>>([
        { id: v1(), title: "HTML & CSS", isDone: true },
        { id: v1(), title: "ES6 & TS", isDone: false },
        { id: v1(), title: "React & Redux", isDone: false },
    ])




    const removeTask = (taskId: string) => {
        const updatedTasks = tasks.filter(t => t.id !== taskId)
        setTasks(updatedTasks)
    }


    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks([newTask, ...tasks])
    }


    const changeTaskStatus = (taskId: string, newIsDone: boolean) => {
        setTasks(tasks.map( t => t.id === taskId ? {...t, isDone: newIsDone} : t     ))

    }



    

    const [filter, setFilter] = React.useState<FilteredValuesType>("all") //var fileter, fn setFilter
    //useState fn belongs to react object 
    //scheme of destructurisation 
    //state это хук, переменная за которой следит реакт 

    const changeFilterValue = (filter: FilteredValuesType) => setFilter(filter)

    const getFilteredTasls = (tasks: Array<TaskType>, filter: FilteredValuesType) => {
        //let filteredTasks: Array<TaskType> = []
        switch (filter) {
            case "active":
                return tasks.filter(t => t.isDone === false);
            case "completed":
                return tasks.filter(t => t.isDone === true);
            default:
                return tasks;
        }
        // if (filter === "all") {
        //     filteredTasks = tasks
        // }

        // if (filter === "active") {
        //     filteredTasks = tasks.filter(t => t.isDone === false)
        // }

        // if (filter === "completed") {
        //     filteredTasks = tasks.filter(t => t.isDone === true)
        // }

        // return filteredTasks
    }

    let filteredTasks: Array<TaskType> = getFilteredTasls(tasks, filter)

    console.log(filteredTasks)
  
   

    //UI:
    return (
        <div className="App">
            
            <TodoList
                title={todoListTitle}
                tasks={filteredTasks}
                changeFilterValue={changeFilterValue}
                removeTask={removeTask}
                addTask={addTask}
                changeTasksStatus={changeTaskStatus} 
                filter={filter}            />


        </div>
    );
}

export default App;