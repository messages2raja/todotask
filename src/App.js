import './App.css';
import Todo from './Todo';
import {useState,useEffect} from 'react';

function App() {

  const [todoList,setTodoList] = useState([]);
  const getTodoList = async(url) => {
  fetch('https://dummyjson.com/todos')
.then(res => res.json())
.then(result  => setTodoList(result.todos));
   }
  useEffect(()=>{
    const url = "https://dummyjson.com/docs/todos";
    getTodoList(url);
  },[])
  
  return (
    <div className="App">
    <Todo todoList={todoList}/>
    <p>Task Board by Raja Arumugam</p>
    </div>
  );
}

export default App;
