import React,{useState} from 'react';
import './Todo.css';
export default function Todo({todoList}){

  const [completedTasks,setCompletedTasks] = useState([]);
    const todoCheckBoxClickHandler = (e) =>{
        const filteredTasks = completedTasks.filter((task)=> task!==e.target.value);
        if(e.target.checked){
          setCompletedTasks([...filteredTasks,e.target.value])
        }
        else{
          setCompletedTasks(filteredTasks)
        }
      }
    return (
        <>
        <div>
        <h2>Did It</h2>
        <div data-testid="completedtasks" className="didItContainer">
        {completedTasks.length === todoList.length && (<h2>&#128522; Good Job, All Tasks Completed</h2>)}
              
           {
               completedTasks.length>0
               ?(<ul>{completedTasks.map((task)=><li key={`completed-task-${task.id}`} >{task}</li>)}</ul>)
               :(<h2>&#128543; No Tasks Completed yet</h2>)
             }
        </div>
        </div>
        <div>
        <h2>To Do</h2>
        <div className="flexContainer">
          <ul>
           {
               todoList.map((todo,index)=>(
                   <li data-testid={`todo-${todo.id}`} key={`todo-${todo.id}`}>
                   <label><input data-testid={`todo-check-${todo.id}`} type="checkbox" name="checkbox" onChange={(e)=>todoCheckBoxClickHandler(e)} value={todo.todo}/>{` ${index+1}.  ${todo.todo}`}</label>
                   </li>
               ))
           }
           </ul>
        </div>
        </div>
        </>
    )
}
