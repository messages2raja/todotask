import * as React from 'react';
import { render,screen,fireEvent,cleanup,within, getAllByRole } from "@testing-library/react";

import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

import Todo from "./Todo";

afterEach(() => {
    cleanup();
});

const todoList = [
    {
        "id": 1,
        "todo": "Do something nice for someone I care about",
        "completed": true,
        "userId": 26
      },
      {
        "id": 2,
        "todo": "Do something nice for someone who care about me",
        "completed": true,
        "userId": 27
      }
]

const renderTodo = () => render(<Todo todoList={todoList}/>);

describe('Test Todolist Component',()=>{
    test('Todo renders properly with initial values',()=>{
        const {container,getAllByRole,getByRole} = renderTodo();
         expect(getByRole('heading',{name:'To Do'})).toHaveTextContent('To Do');
         expect(getAllByRole('listitem')).toHaveLength(2);
         const checkboxes = container.querySelectorAll('input[type="checkbox"]');
         expect(checkboxes.length).toBe(2);
          checkboxes.forEach((checkbox) => {
            expect(checkbox.checked).toBe(false);
          });
          expect(screen.getByRole('heading',{name:/No Tasks Completed yet/i})).toHaveTextContent(/No Tasks Completed yet/i);
     
    })
    test('Todo renders with Todo 1',()=>{
        const {queryByTestId} = renderTodo();
        expect(queryByTestId('todo-1')).toHaveTextContent('Do something nice for someone I care about')
    })
    test('Todo renders with Todo 2',()=>{
        const {queryByTestId} = renderTodo();
        expect(queryByTestId('todo-2')).toHaveTextContent('Do something nice for someone who care about me')
    })
    test('Todo checkbox clicked', ()=>{
        const {queryByTestId} = renderTodo();
        let item = queryByTestId('todo-1');
        let utils = within(item);
        let todoCheckBox = utils.getByRole("checkbox");
        expect(todoCheckBox.checked).toBe(false);
        fireEvent.click(todoCheckBox);
        expect(todoCheckBox.checked).toBe(true);
       })
    test('Test checkbox unchecked and No task completed scenario', ()=>{
        const {queryByTestId} = renderTodo();
        let item = queryByTestId('todo-1');
        let utils = within(item);
        let todoCheckBox = utils.getByRole("checkbox");
        expect(todoCheckBox.checked).toBe(false);
        fireEvent.click(todoCheckBox);
        expect(todoCheckBox.checked).toBe(true);
        let completedTasks = queryByTestId('completedtasks');
        let completedtasksUtils = within(completedTasks);
        let completedtasksList = completedtasksUtils.getAllByRole('listitem')
        expect(completedtasksList).toHaveLength(1);
        expect(completedtasksList[0]).toHaveTextContent('Do something nice for someone I care about');
        fireEvent.click(todoCheckBox);
        expect(todoCheckBox.checked).toBe(false);
        expect(screen.getByRole('heading',{name:/No Tasks Completed yet/i})).toHaveTextContent(/No Tasks Completed yet/i);
    })
    test('Test All task completed scenario', ()=>{
        const {queryByTestId} = renderTodo();
        let item1 = queryByTestId('todo-1');
        let utils1 = within(item1);
        let todoCheckBox1 = utils1.getByRole("checkbox");
        expect(todoCheckBox1.checked).toBe(false);
        fireEvent.click(todoCheckBox1);
        expect(todoCheckBox1.checked).toBe(true);

        let item2 = queryByTestId('todo-2');
        let utils2 = within(item2);
        let todoCheckBox2 = utils2.getByRole("checkbox");
        expect(todoCheckBox2.checked).toBe(false);
        fireEvent.click(todoCheckBox2);
        expect(todoCheckBox2.checked).toBe(true);
        expect(screen.getByRole('heading',{name:/Good Job, All Tasks Completed/i})).toHaveTextContent(/Good Job, All Tasks Completed/i);
    })
})