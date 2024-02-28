import { useEffect, useState } from "react";
import "./App.css";
import Task from "./Task";
import Taskform from "./Taskform";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (tasks.length === 0) return;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    setTasks(tasks);
  }, []);
  const numberComplete = tasks.filter((t) => t.done).length;
  const numberTotal = tasks.length;
  const percentage = (numberComplete / numberTotal) * 100;
  function getMessage() {
    if (percentage === 0) {
      return "At least do one";
    }
    if (percentage === 100) {
      return "good job for today";
    }
    return "keep it gooing";
  }

  function addTasks(name) {
    setTasks((prevTasks) => [...prevTasks, { name, done: false }]);
  }
  function updateDoneTask(taskIndex, newDone) {
    setTasks((prev) => {
      const newTasks = [...prev];
      newTasks[taskIndex].done = newDone;
      return newTasks;
    });
  }

  function removeTask(indexToRemove) {
    setTasks((prev) => {
      return prev.filter((taskOpject, index) => index !== indexToRemove);
    });
  }
  function renameTask(index, newName) {
    setTasks((prev) => {
      const newTasks = [...prev];
      newTasks[index].name = newName;
      return newTasks;
    });
  }

  return (
    <main>
      <h1>
        {numberComplete} /{numberTotal} complete
      </h1>
      <h2>{getMessage()}</h2>
      <Taskform onAdd={addTasks} />

      {tasks.map((task, index) => (
        <Task
          key={index}
          {...task}
          onToggle={(done) => updateDoneTask(index, done)}
          onDelete={() => removeTask(index)}
          onRename={(newName) => renameTask(index, newName)}
        />
      ))}
    </main>
  );
}

export default App;
