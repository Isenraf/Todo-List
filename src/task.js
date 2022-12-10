import { v1 as uuidv4 } from "uuid";

class Task {
  title;
  description;
  dueDate;
  priority;
  status;
  id;

  constructor(title, description, dueDate, priority, status) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.status = status ? "fufilled" : "pending";
    this.id = uuidv4();
  }
}

export default Task;
