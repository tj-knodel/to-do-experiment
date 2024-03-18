import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { invoke } from '@tauri-apps/api';
import { useState } from "react";

function App(props : any) {
  const [tasks, setTasks] = useState(props.tasks);

  const taskList = tasks?.map((task: any) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id} />
  ));

  function addTask(name: string) {
    invoke('print', { message: name});
    const newTask = { id: "id", name, completed: false};
    setTasks([...tasks, newTask]);
  }

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        <FilterButton />
        <FilterButton />
        <FilterButton />
      </div>
      <h2 id="list-heading">3 tasks remaining</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
}

export default App;
