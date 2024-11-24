import { useEffect, useState } from 'react';
import Navbar from './compoents/Navbar';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import { MdDelete } from "react-icons/md"
import { FaRegEdit } from "react-icons/fa";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showfinished, setshowfinished] = useState(true)
  const savTolos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  useEffect(() => {
    let todostring = localStorage.getItem("todos");
    if (todostring) {
      let todos = JSON.parse(todostring);

      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));

  }, [todos]);

  const handleAdd = () => {
    if(todo.trim()!=""){
    setTodos([...todos, { id: uuidv4(), todo, isComplete: false }]);
    }
    setTodo(""); // Clear the input after adding the todo
    savTolos();
  };

  const handleEdit = (e, id) => {

    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let edittodo = todos[index]
    setTodo(edittodo.todo);
    if(edittodo!=todos[index]){
    let newtodos = todos.filter(item => {
      return item.id !== id;
    })
  }
    setTodos(newtodos);

  }


  const handleDelete = (e, id) => {
    alert('Confirm to delete')
    let newtodos = todos.filter(item => {
      return item.id !== id;
    })
    setTodos(newtodos);

  };

  const handleChange = (e) => {
  
    setTodo(e.target.value);
  };
  const handelcheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })

    let newtodos = [...todos];
    newtodos[index].isComplete = !newtodos[index].isComplete;
    setTodos(newtodos);

  };
  const togglefinished=(e)=>{
    setshowfinished(!showfinished)
    
  }

  return ( 
    <>
      <Navbar />
      <div className=" w-full sm:w-3/4 relative mx-auto bg-violet-100 rounded-xl my-3 p-6 min-h-[80vh]">
        <h2 className="font-bold text-lg text-center mb-2">Add a Todo</h2>
        <div className="addTodo">
          <input className="w-full rounded-md " onChange={handleChange} value={todo} type="text" />
          <button onClick={handleAdd} className="text-white bg-violet-950 rounded-md px-2 my-2 w-full">
          Save
          </button>
          <h2 className=" text-center font-bold ">Your Todos</h2>
        </div>
  <input type="checkbox"  onChange={togglefinished}  className='mx-1' checked={showfinished} name="" id="" />Show finished
        <div className="todos w-1/3">
          {todos.length === 0 && <div className='m-3'>No Todo </div>}
          {todos.map((item, index) => (
            

           ( showfinished|| item.isComplete )&& <div key={item.id} className="todo flex justify-between items-center my-2">
              <div className='flex gap-6 '>
                <input onChange={handelcheckbox} type="checkbox" name={item.id} checked={item.isComplete} />
                <div className={`${item.isComplete ? "line-through" : ""} w-[150px] h-auto overflow-hidden break-words`}>{item.todo}</div>


              </div>
              <div className="buttons flex w-full">
                <button onClick={(e) => handleEdit(e, item.id)} className="text-white bg-violet-950 rounded-md px-2 mx-2 w-[122]">
                <FaRegEdit />
                </button>
                <button onClick={(e) => handleDelete(e, item.id)} className="text-white bg-violet-950 rounded-md px-2 w-[122]">
                <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}


export default App;
