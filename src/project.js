import Task from "./task";
import { v1 as uuidv4 } from "uuid";
import { format } from "date-fns";

class Project {
  name;
  icon;
  id;
  todos;

  constructor(icon, name) {
    this.name = name;
    this.icon = icon;
    this.todos = [];
    this.id = uuidv4();
  }

  getAllTask() {
    return this.todos;
  }

  getTask(id) {
    const task = this.todos.find((task) => task.id === id);
    return task;
  }

  addTask(u_title, u_description, u_dueDate, u_priority, u_status) {
    const newTask = new Task(
      u_title,
      u_description,
      format(u_dueDate, "MMM d"),
      u_priority,
      u_status
    );

    this.todos.push(newTask);
  }

  updateTask(id, opt) {
    const task = this.todos.find((task) => task.id === id);

    if (!task) return;

    for (const [key, value] of Object.entries(opt)) {
      if (!task[key]) continue;
      task[key] = value;
    }
  }

  deleteTask(id) {
    const newTodos = this.todos.filter((task) => task.id !== id);
    this.todos = newTodos;
  }
}

export default Project;
