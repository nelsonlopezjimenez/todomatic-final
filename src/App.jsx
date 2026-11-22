import { useState, useRef } from "react";
import { flushSync } from "react-dom";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import { nanoid } from "nanoid";

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App({ initialTasks }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState("All");
  const listHeadingRef = useRef(null);

  function toggleTaskCompleted(id) {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        // if this task has the same ID as the edited task
        if (id === task.id) {
          // invert the task's `completed` prop
          task.completed = !task.completed;
        }
        return task;
      }),
    );
  }

  function deleteTask(id) {
    // The deleted task's buttons are gone, so move focus to the list heading
    flushSync(() =>
      setTasks((prevTasks) => prevTasks.filter((task) => id !== task.id)),
    );
    listHeadingRef.current.focus();
  }

  function editTask(id, newName) {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        // if this task has the same ID as the edited task
        if (id === task.id) {
          // Copy the task and update its name
          return { ...task, name: newName };
        }
        // Return the original task if it's not the edited task
        return task;
      }),
    );
  }

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task, index) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={index}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  function addTask(name) {
    const newTask = { id: "todo-" + nanoid, name: name, completed: false };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  }

  const remainingCount = taskList.length;
  const tasksNoun = remainingCount > 1 ? "tasks" : "task";
  const headingText = `${remainingCount} ${tasksNoun} remaining`;

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">{filterList}</div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2>
      <ul
        aria-labelledby="list-heading"
        className="todo-list stack-large stack-exception"
        role="list"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
