import React, { useState } from 'react';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';
import { LiaTimesSolid } from 'react-icons/lia';

function TodoList() {
  const [theme, setTheme] = useState('dark');
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');
  const [activeFilter, setActiveFilter] = useState('all');
  

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const deleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const toggleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const clearCompleted = () => {
    const updatedTodos = todos.filter((todo) => !todo.completed);
    setTodos(updatedTodos);
  };

  const incompleteTodosCount = todos.filter((todo) => !todo.completed).length;

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'complete') return todo.completed;
    return true; // 'all' filter
  });

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent the form from submitting and refreshing the page
    addTodo();
  };

  return (
    <div className={`todolist h-screen ${theme === 'dark' ? 'bg-[#171823]' : 'bg-[#fff]'}`}>
      <div className={`min-w-[325px] md:min-w-[1340px] h-[300px] md:h-[960px] ${theme === 'dark' ? 'darkbg' : 'lightbg'}`}>
        <div className='absolute w-[360px] md:w-full h-[300px] md:h-[282px] top-0 left-0 bg-[#4B0082] bg-opacity-60'>
          <div className='w-[325px] md:w-[540px] mx-[4%] md:mx-[30%]'>
            <div className='flex mt-12 justify-between'>
              <h2 className='font-bold text-[40px] text-white tracking-[15px]'>TODO</h2>
              <button onClick={toggleTheme} className='text-white'>
                {theme === 'dark' ? <BsFillSunFill size={26} /> : <BsFillMoonFill size={26} />}
              </button>
            </div>
            <form onSubmit={handleFormSubmit}>
              <div className='input-container relative'>
                <div className="w-5 h-5 rounded-full border absolute top-[65px] left-3"></div>
                <input
                  type='text'
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  className={`mt-12 px-12 text-[18px] w-[325px] md:w-[540px] h-[55px] outline-none ${theme === 'dark' ? 'bg-[#25273D] text-[#C8CBE7]' : 'bg-[#fff] text-[#494C6B]'}`}
                  placeholder='Create a new todo'
                />
              </div> 
              <button type="submit" style={{ display: 'none' }}></button>
            </form>
          </div>
          <div className='w-[325px] md:w-[540px] mx-[4%] md:mx-[30%] mt-8 pt-2'>
          <ul className={`${theme === 'dark' ? 'bg-[#25273D] text-[#C8CBE7] dark' : 'bg-[#fff] text-[#494C6B]'}`}>
              {filteredTodos.map((todo, index) => (
                <li key={index} className={`flex py-4 ${theme === 'dark' ? 'text-[#C8CBE7]' : 'text-[#494C6B]'} text-[18px]`} style={{
                  borderBottom: `1px solid ${theme === 'dark' ? '#393A4B' : '#E3E4F1'}`,
                }}>
                  <div className={`circular-checkbox ${theme === 'dark' ? 'dark' : 'light'} ${todo.completed ? 'checked' : ''}`} onClick={() => toggleComplete(index)}>
                    <input
                      type='checkbox'
                      className='circular-checkbox-input'
                      checked={todo.completed}
                      onChange={() => toggleComplete(index)}
                      id={`checkbox-${index}`}
                    />
                  </div>
                  <div className={`flex ${
                    theme === 'dark'
                      ? todo.completed
                        ? 'text-[#4D5067]'
                        : 'text-[#C8CBE7]'
                      : todo.completed
                      ? 'text-[#D1D2DA]'
                      : 'text-[#494C6B]'
                    }`}
                  >
                    <div
                      style={{
                        textDecoration: todo.completed ? 'line-through' : 'none',
                        marginLeft: '16px',
                        marginRight: '30px',      
                      }}
                      className='flex cursor-pointer'
                    >
                      {todo.text}
                    </div>
                    <div className="delete-container"> 
                      <LiaTimesSolid size={22}
                        onClick={() => deleteTodo(index)}
                        className={`${
                          theme === 'dark' ? 'text-[#C8CBE7]' : 'text-[#494C6B]'
                        } text-[16px] cursor-pointer flex-1`}
                      />
                      
                    </div>
                  </div>

                </li>
              ))}
            </ul>
          </div>
          <div className={`hidden md:flex justify-between w-[325px] md:w-[540px] mx-[4%] md:mx-[30%] p-4 ${theme === 'dark' ? 'bg-[#25273D] text-[#5B5E7E]' : 'bg-[#fff] text-[#9495A5]'} text-[14px] font-bold`}>
            <div>
              <span>{incompleteTodosCount} item{incompleteTodosCount !== 1 ? 's' : ''} left</span>
            </div>
            <div className='flex gap-4'>
              <button
                onClick={() => {
                  setFilter('all');
                  setActiveFilter('all');
                }}
                className={activeFilter === 'all' ? 'text-[#3A7CFD]' : ''}
              >
                All
              </button>
              <button
                onClick={() => {
                  setFilter('active');
                  setActiveFilter('active');
                }}
                className={activeFilter === 'active' ? 'text-[#3A7CFD]' : ''}
              >
                Active
              </button>
              <button
                onClick={() => {
                  setFilter('complete');
                  setActiveFilter('complete');
                }}
                className={activeFilter === 'complete' ? 'text-[#3A7CFD]' : ''}
              >
                Completed
              </button>
              <button onClick={clearCompleted}>Clear Completed</button>
            </div>
          </div>

          <div className={`md:hidden justify-between w-[325px] md:w-[540px] mx-[4%] md:mx-[30%] p-4 ${theme === 'dark' ? 'bg-[#25273D] text-[#5B5E7E]' : 'bg-[#fff] text-[#9495A5]'} text-[14px] font-bold`}>
              <div className='flex justify-between'>
                <span>{incompleteTodosCount} item{incompleteTodosCount !== 1 ? 's' : ''} left</span>
                <button onClick={clearCompleted}>Clear Completed</button>
              </div>
          </div>
          <div className={`md:hidden mt-4 flex justify-center gap-4 w-[325px] md:w-[540px] mx-[4%] md:mx-[30%] p-4 ${theme === 'dark' ? 'bg-[#25273D] text-[#5B5E7E]' : 'bg-[#fff] text-[#9495A5]'} text-[14px] font-bold`}>
                <button
                  onClick={() => {
                    setFilter('all');
                    setActiveFilter('all');
                  }}
                  className={activeFilter === 'all' ? 'text-[#3A7CFD]' : ''}
                >
                  All
                </button>
                <button
                  onClick={() => {
                    setFilter('active');
                    setActiveFilter('active');
                  }}
                  className={activeFilter === 'active' ? 'text-[#3A7CFD]' : ''}
                >
                  Active
                </button>
                <button
                  onClick={() => {
                    setFilter('complete');
                    setActiveFilter('complete');
                  }}
                  className={activeFilter === 'complete' ? 'text-[#3A7CFD]' : ''}
                >
                  Completed
                </button>
              
          </div>

        </div>
      </div>
    </div>
  );
}

export default TodoList;
