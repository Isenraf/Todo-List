import Project from "./project";

class Todo {
  #project;
  #projectList = [];

  constructor(data) {
    if (!data) {
      // DEFAULT LISTS
      this.addProject('<i class="las la-inbox inbox"></i>', "inbox");
      this.addProject('<i class="las la-calendar-day today"></i>', "today");
      this.addProject('<i class="las la-calendar-week week"></i>', "week");
    } else {
      this.loadProjects(data);
    }

    // ACTIVE DEFAULT LIST
    this.project = this.#projectList[0].id;
  }

  getAllProject() {
    return this.#projectList;
  }

  getProject(projectID) {
    const element = this.#projectList.find((p) => p.id === projectID);
    return element;
  }

  addProject(u_icon, u_name) {
    const newProject = new Project(u_icon, u_name);
    this.#projectList.push(newProject);
    return newProject.id;
  }

  updateProject(id, opt) {
    const project = this.#projectList.find((_, projectID) => id === projectID);

    if (!project) return;

    for (const [key, value] of Object.entries(opt)) {
      if (key === "todos" || !project[key]) continue;
      project[key] = value;
    }
  }

  deleteProject(id) {
    const newProjects = this.#projectList.filter(
      (project) => project.id !== id
    );

    this.#projectList = newProjects;
    this.project = this.#projectList[0].id;
  }

  loadProjects(projectList) {
    if (!projectList || projectList.length === 0) return;

    projectList.forEach((p) => {
      const id = this.addProject(p.icon, p.name);

      const project = this.getProject(id);

      p.todos.forEach((task) => {
        project.addTask(
          task.title,
          task.description,
          new Date(),
          task.priority,
          false
        );
      });
    });
  }

  get project() {
    return this.#project;
  }

  set project(projectID) {
    const element = this.#projectList.find((p) => p.id === projectID);

    if (!element) {
      console.log("project not found");
      return;
    }

    this.#project = element;
  }
}

export default Todo;
