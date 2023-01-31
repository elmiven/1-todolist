import React from 'react';
import './App.css';
import TodoList, { TaskType } from './Todolist';

// BLL:
function App() {
    const todoListTitle: string = "What to learn";
    const tasks: Array<TaskType> = [
        { id: 1, title: "HTML & CSS", isDone: true },
        { id: 2, title: "ES6 & TS", isDone: false },
        { id: 2, title: "React & Redux", isDone: false },

    ]
    
    //UI:
    return (
        <div className="App">
            <TodoList title={todoListTitle} tasks={tasks} />

        </div>
    );
}

export default App;
