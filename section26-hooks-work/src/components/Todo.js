import React, { useState, useEffect, useReducer, useMemo } from 'react';

import axios from 'axios';
import List from './List';
import { useFormInput } from '../hooks/forms';

const todo = props => {
    // const [todoName, setTodoName] = useState('');
//    const [todoList, setTodoList] = useState([]); // changed to reducer below
    // example of doing the above in one state, not necessarily recommended
    // const [todoState, setTodoState] = useState({userInput: '', todoList: []})

    const todoListReducer = (state, action) => {
        switch (action.type) {
            case 'ADD':
                return state.concat(action.payload);
            case 'REMOVE':
                return state.filter((todo) => todo.id !== action.payload);
            case 'SET':
                return action.payload
            default:
                return state;
        }
    }

    const [todoList, dispatch] = useReducer(todoListReducer, []);
    const [todoCount, setTodoCount] = useState(0);
    // const [inputIsValid, setInputIsValid] = useState(false);
    const todoInput = useFormInput();
    // const [submittedTodo, setsubmittedTodo] = useState(null); // uses reducer now

    useEffect(() => {
        axios.get('https://section26-hooks.firebaseio.com/todos.json')
            .then(res => {
                console.log(res);
                const todoData = res.data;
                const todos = []
                for (const key in todoData) {
                    todos.push({id: key, name: todoData[key].name})
                }
                // setTodoList(todos);
                dispatch({type: 'SET', payload:todos});
            })
            .catch(err => {
                console.log(err)
            })
    }, [todoCount])

    // useEffect(() => {
    //     if (submittedTodo) {
    //         // setTodoList(todoList.concat(submittedTodo))        
    //         dispatch({type: 'ADD', payload: submittedTodo}) 
    //     }
    // }, [submittedTodo])
    
    // const inputChangeHandler = (event) => {
    //     setTodoName(event.target.value)
    //     inputValidationHandler(event);
            // example of doing the above in one state, not necessarily recommended
            // setTodoState({userInput: event.target.value, todoList: todoState.todoList})
    // }

    // the following function and hook demonstrate how to clean up with useEffect (return stmt)
    // const mouseMoveHandler = event => {
    //     console.log(event.clientX, event.clientY);
    // }

    // useEffect(() => {
    //     document.addEventListener('mousemove', mouseMoveHandler);
    //     return () => {
    //         document.removeEventListener('mousemove', mouseMoveHandler);
    //     }
    // }, [])

    const todoAddHandler = () => {
        const todoName = todoInput.value
        axios.post('https://section26-hooks.firebaseio.com/todos.json', {name: todoName})
            .then(res => {
                console.log(res)
                setTodoCount(todoCount + 1)
                const todoItem = {id: res.data.name, name: todoName}
                dispatch({type: 'ADD', payload: todoItem});
            })
            .catch(err => {
                console.log(err)
            })
    }

    const todoDeleteHandler = todoId => {
        axios.delete(`https://section26-hooks.firebaseio.com/todos/${todoId}.json`)
            .then(res => {
                dispatch({type: 'REMOVE', payload: todoId})
            })
            .catch(err => {
                console.log(err);
            })
    }

    // const inputValidationHandler = event => {
    //     if (event.target.value.trim() === '') {
    //         setInputIsValid(false)
    //     } else {
    //         setInputIsValid(true)
    //     }
    // }

    return (
        <React.Fragment>
            <input 
                type="text" 
                placeholder="Todo" 
                // onChange={inputChangeHandler}
                onChange={todoInput.onChange} 
                // value={todoName} 
                value={todoInput.value}
                style={{backgroundColor: todoInput.validity === true ? 'transparent' : 'red'}}
            />
            <button 
                type="button"
                onClick={todoAddHandler}    
            >Add</button>
            {useMemo(() => <List items={todoList} onClick={todoDeleteHandler}/>, [todoList])}
        </React.Fragment>
    )
}

export default todo;