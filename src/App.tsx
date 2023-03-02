import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import TodoList, { TaskType } from './Todolist';

type TodoListType = {
    id: string
    title: string
    filter: FilteredValuesType
}

type TodoListStateType = Array<TodoListType>

export type FilteredValuesType = "all" | "active" | "completed"


export type TasksStateType = { 
[todoListId: string]: Array<TaskType> 
}






function App(): JSX.Element {
    // BLL:
    const todoListTitle: string = "What to learn";

    // old todolists when was 1 tasklist
    // const tasks: Array<TaskType> = [
    //     { id: 1, title: "HTML & CSS", isDone: true },
    //     { id: 2, title: "ES6 & TS", isDone: false },
    //     { id: 2, title: "React & Redux", isDone: false },
    // ]
    // const [tasks, setTasks] = useState<Array<TaskType>>([
    //     { id: v1(), title: "HTML & CSS", isDone: true },
    //     { id: v1(), title: "ES6 & TS", isDone: false },
    //     { id: v1(), title: "React & Redux", isDone: false },
    // ])


    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        { id: todoListId_1, title: "What to learn", filter: "all" },
        { id: todoListId_2, title: "What to buy", filter: "all" },
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListId_1]: [
            { id: v1(), title: "HTML & CSS", isDone: true },
            { id: v1(), title: "ES6 & TS", isDone: false },
            { id: v1(), title: "React & Redux", isDone: false },
        ],
        [todoListId_2]: [
            { id: v1(), title: "Milk", isDone: true },
            { id: v1(), title: "Bread", isDone: false },
            { id: v1(), title: "Maet", isDone: false },
        ],



    })





    const removeTask = (todoListId: string, taskId: string) => {

        const tasksForUpdate = tasks[todoListId]
        const updatedTasks = tasksForUpdate.filter(t => t.id !== taskId)
        const copyTasks = { ...tasks }
        copyTasks[todoListId] = updatedTasks
        setTasks(copyTasks)

        //another way to write it
        // setTasks({...tasks, 
        //     [todoListId]: tasks[todoListId].filter(t => t.id !== taskId )})

        // old for 1 task
        // setTasks(tasks.filter(t => t.id !== taskId))
    }


    const addTask = (todoListId: string, title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }

        const tasksForUpdate = tasks[todoListId]
        const updatedTasks = [newTask, ...tasksForUpdate]
        const copyTasks = { ...tasks }
        copyTasks[todoListId] = updatedTasks
        setTasks(copyTasks)

        //another way
        // setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
        // old from 1 tak version   
        // setTasks([newTask, ...tasks])
    }


    const changeTaskStatus = (todoListId: string, taskId: string, newIsDone: boolean) => {
        const tasksForUpdate = tasks[todoListId]
        const updatedTasks = tasksForUpdate.map(t => t.id === taskId ? { ...t, isDone: newIsDone } : t)
        const copyTasks = { ...tasks }
        copyTasks[todoListId] = updatedTasks
        setTasks(copyTasks)

        // another way
        // setTasks({...tasks, 
        //     [todoListId]: tasks[todoListId]
        //     .map(t => t.id === taskId ? {...t, isDone: newIsDone} : t)})

        // old
        // setTasks(tasks.map(t => t.id === taskId ? { ...t, isDone: newIsDone } : t))

    }




    const [filter, setFilter] = React.useState<FilteredValuesType>("all") //var fileter, fn setFilter
    //useState fn belongs to react object 
    //scheme of destructurisation 
    //state это хук, переменная за которой следит реакт 

    // old version for 1 task
    // const changeFilterValue = (filter: FilteredValuesType) => setFilter(filter)

    const changeFilterValue = (todoListId: string, filter: FilteredValuesType) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? { ...tl, filter: filter } : tl))
    }


    const getFilteredTasks = (tasks: Array<TaskType>, filter: FilteredValuesType):Array<TaskType> => {
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
    // let filteredTasks = getFilteredTasks(tasks: filter)
    // console.log(filteredTasks)



    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId]
        //another way delete tasks after we delte todolist (w rerender)
        // const copyTasks = {...tasks}
        // delete copyTasks[todoListId]
        // setTasks(copyTasks)
    }


    //UI:
    const todoListsComponent = todoLists.map(tl => {
        const filteredTasks = getFilteredTasks(tasks[tl.id], tl.filter)

        return (
            <TodoList
                key={tl.id}
                todoListId={tl.id}
                title={tl.title}
                tasks={filteredTasks}
                filter={tl.filter}

                removeTask={removeTask}
                addTask={addTask}

                changeTasksStatus={changeTaskStatus}

                changeFilterValue={changeFilterValue}
                removeTodoList={removeTodoList}
            />
        )
    })


    return (
        <div className="App">
            {todoListsComponent}


        </div>
    );
}

export default App;