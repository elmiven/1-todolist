import React, { useState } from 'react';
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
            { id: 1, title: "HTML & CSS", isDone: true },
            { id: 2, title: "ES6 & TS", isDone: false },
            { id: 3, title: "React & Redux", isDone: false },
    ])


    const removeTask = (taskId: number) => {
        const updatedTasks = tasks.filter(t => t.id !== taskId)
        setTasks(updatedTasks)
    }


    
    




    const [filter, setFilter] = React.useState<FilteredValuesType>("all") //var fileter, fn setFilter
    //useState fn belongs to react object 
    //scheme of destructurisation 
    //state это хук, переменная за которой следит реакт 



    const changeFilterValue = (filter: FilteredValuesType) => setFilter(filter)

    let filteredTasks: Array<TaskType> = []

    if (filter === "all") {
        filteredTasks = tasks
    }
  
    if(filter === "active") {
        filteredTasks = tasks.filter(t => t.isDone === false)
    }

    if(filter === "completed") {
        filteredTasks = tasks.filter(t => t.isDone === true)
    }




    //UI:
    return (
        <div className="App">
            <TodoList 
                title={todoListTitle} 
                tasks={filteredTasks} 
                changeFilterValue={changeFilterValue}
                removeTask = {removeTask}
                />
        </div>
    );
}

export default App;