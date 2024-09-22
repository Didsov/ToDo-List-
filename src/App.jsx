import { useEffect, useState } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import Task from "./components/Task";
import FilterButton from "./components/FilterButton";

function App() {
  const TASK = {
    key: Date.now(),
    title: "Add new task",
    isChecked: false,
  };

  const filterMods = [
    {
      title: "Все",
      modeName: "All",
    },
    {
      title: "Ожидающие",
      modeName: "UnChecked",
    },
    {
      title: "Выполенные",
      modeName: "Checked",
    },
  ];

  const [taskList, setTaskList] = useState([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true); // Флаг для отслеживания первого рендера
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      console.log("Loading from localStorage:", storedTasks);
      setTaskList(storedTasks.length > 0 ? storedTasks : [TASK]);
    }
  }, []); // Этот эффект запускается только один раз при монтировании компонента

  useEffect(() => {
    if (isInitialLoad) {
      // Пропускаем обновление при первом рендере
      setIsInitialLoad(false);
    } else {
      console.log("Task list updated:", taskList);
      localStorage.setItem("tasks", JSON.stringify(taskList));
    }
  }, [taskList]); // Этот эффект срабатывает при изменении taskList, но не при первом рендере

  const handleAddTask = (title) => {
    let newList = [...taskList];

    newList.unshift({
      key: Date.now(),
      title: title,
      isChecked: false,
    });
    setTaskList(newList);
  };

  const handleCheck = (key) => {
    const newList = taskList.map((task) =>
      task.key === key ? { ...task, isChecked: !task.isChecked } : task
    );

    setTaskList(newList); // Обновляем состояние после изменения задачи
  };

  const handleDelete = (key) => {
    const newList = taskList.filter((item) => {
      return item.key != key;
    });
    console.log(newList);
    setTaskList(newList);
  };
  const handleEditTitle = (key, newTitle) => {
    const newList = taskList.map((task) =>
      task.key === key ? { ...task, title: newTitle } : task
    );

    setTaskList(newList); // Обновляем состояние после изменения задачи
  };

  return (
    <>
      <div className="max-w-7xl w-full m-auto p-5">
        <TaskInput addTask={handleAddTask} />
        <div className="m-4">
          {filterMods.map((item) => (
            <FilterButton
              title={item.title}
              modeName={item.modeName}
              onClick={() => {
                setFilter(item.modeName);
              }}
              activeMode={filter}
            />
          ))}
        </div>
        <ul className="pl-10 max-w-[400px]">
          {taskList
            .filter((task) => {
              if (filter === "UnChecked") return !task.isChecked;
              if (filter === "Checked") return task.isChecked;
              return true; // 'all'
            })
            .sort((a, b) => a.isChecked - b.isChecked)
            .map((task) => (
              <Task
                key={task.key}
                id={task.key}
                title={task.title}
                isChecked={task.isChecked}
                handleCheck={handleCheck}
                handleDelete={handleDelete}
                handleEditTitle={handleEditTitle}
              />
              // const filteredTasks = tasks.filter(task => {
              //   if (filter === 'completed') return task.completed;
              //   if (filter === 'active') return !task.completed;
              //   return true; // 'all'
              // });
            ))}
        </ul>
      </div>
    </>
  );
}

export default App;
