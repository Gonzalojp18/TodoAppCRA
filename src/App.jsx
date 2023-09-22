import React from "react";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";
import './components/App.css'
import { Avatar } from '@chakra-ui/react'
import { StarIcon} from '@chakra-ui/icons'
import {
  List
} from '@chakra-ui/react'


const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState("All");

  const listHeadingRef = useRef(null);

  // focus on the element associated with our ref (via the ref attribute) only when our user deletes a task from their list
  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }



  // Iteration using map method task should only render if it is included in the results of applying the selected filter.
  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));


    // Singular or plurar
  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun.toLocaleUpperCase()} Remaining`;

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  // callback Props
  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTasks([...tasks, newTask]);
  }

  // With the syntaxys ... we create a copy of task. And we add the new object that saves newtask to the already existing one.

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  // FUNTION TO DELETE TASK
  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  // FUNTION TO EDIT TASK
  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  return (
    <main className="mainBox">
      <section className="navBarBox">
        <div className='boxIcon'>
          <Avatar
            name="Gonzalo Palomo"
            boxSize="3.5rem"
            src="https://bit.ly/broken-link"
          />
          <StarIcon
            boxSize="2rem"
            color="yellow.500"
          />
        </div>

        {/* FILTER BOTON WHERE DO YOU CAN SEE IF THE TASK BE ACTIVE, COMPLETE AND ALL */}
        <div>
          <List className="filterBoton" variant="solid">
            {filterList}
          </List>
        </div>
      </section>

      <section className="taskBody">
        <Form addTask={addTask} />
        <h5
        className="taskRemain"
        id="list-heading"
        tabIndex="-1"
        ref={listHeadingRef}>
          {headingText}
        </h5>
        <ul
        role="list"
        className="lisTask"
        aria-labelledby="list-heading">
          {taskList}
        </ul>
      </section>
    </main>
  );
}

export default App;
