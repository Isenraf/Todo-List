import Todo from "./todo";
import setup from "./setup";
import "./style.css";

function DOM() {
  const todo = new Todo(loadLocalStorage());

  const newProjectBox = document.querySelector(".new");
  const projectHeadline = document.querySelector(".project-headline");
  const projectTodos = document.querySelector(".project-todos");
  const defaultProjectBox = document.querySelector(".default");
  const projectName = document.querySelector("#name");
  const projectForm = document.querySelector(".new-box form");

  const addTaskBox = document.querySelector(".add-task-box");
  const taskForm = document.querySelector("section form");
  const taskTitle = document.querySelector("#title");
  const taskDescription = document.querySelector("#description");
  const taskDate = document.querySelector("#date");
  const taskPriority = document.querySelector("#priority");
  const taskButtonBox = document.querySelector(".task-btn");

  let lists;
  let buttons;

  function renderAllProject() {
    renderDefaultProject();
    renderNewProject();
  }

  function renderNewProject() {
    const markup = generateMarkup(
      todo
        .getAllProject()
        .filter(
          (p) => p.name !== "inbox" && p.name !== "today" && p.name !== "week"
        )
    );

    newProjectBox.textContent = "";
    newProjectBox.insertAdjacentHTML("beforeend", markup);
  }

  function renderDefaultProject() {
    const markup = generateMarkup(
      todo
        .getAllProject()
        .filter(
          (p) => p.name === "inbox" || p.name === "today" || p.name === "week"
        )
    );

    defaultProjectBox.textContent = "";
    defaultProjectBox.insertAdjacentHTML("beforeend", markup);
  }

  function renderActiveProject() {
    lists = Array.from(document.querySelectorAll("li"));

    lists.forEach((li) => li.classList.remove("active"));

    for (const li of lists) {
      if (li.dataset.id === todo.project.id) {
        li.classList.add("active");
        break;
      }
    }

    if (
      todo.project.name !== "inbox" &&
      todo.project.name !== "today" &&
      todo.project.name !== "week"
    ) {
      projectHeadline.innerHTML = `
        <h3>${todo.project.name}</h3>
        
        <button type="button">
          <i class="las la-trash" data-name="delete-project"></i>
        </button>
      `;
      addClick();
    } else {
      projectHeadline.innerHTML = `<h3>${todo.project.name}</h3>`;
    }

    projectTodos.innerHTML = todo.project.todos
      .map((task) => {
        return `
        <div class="task" data-id=${task.id}>
          <input type="checkbox" class="completed" />
          <p>${task.title}</p>
          <p>${task.description}</p>
          <p>${task.dueDate}</p>

          <button type="button">
            <i class="las la-pen-alt" data-name="edit-task"></i>
          </button>     
        </div>`;
      })
      .join("");

    addClick();
    addChange();
  }

  function generateMarkup(list) {
    return list
      .map((p) => {
        return `  
          <li data-id=${p.id}>
            ${p.icon}
            <a href="#">${p.name}</a>
            <span>${p.todos.length}</span>
          </li>`;
      })
      .join("");
  }

  function addClick() {
    buttons = Array.from(document.querySelectorAll("button"));

    lists.forEach((li) => li.addEventListener("click", handleActiveProject));
    buttons.forEach((btn) => btn.addEventListener("click", handleActions));
  }

  function addChange() {
    const taskComplete = document.querySelectorAll(".completed");

    if (taskComplete) {
      taskComplete.forEach((check) =>
        check.addEventListener("change", handleDeleteTask)
      );
    }
  }

  function addSubmit() {
    projectForm.addEventListener("submit", handleProjectForm);
  }

  function handleActiveProject(e) {
    if (e.target.parentNode.localName !== "li") return;

    todo.project = e.target.parentNode.dataset.id;

    renderActiveProject();
    actionHide(taskForm);
    actionUnhide(addTaskBox);
  }

  function handleDeleteTask(e) {
    todo.project.deleteTask(e.target.parentNode.dataset.id);
    save(todo.getAllProject());
    init();
  }

  function handleProjectForm(e) {
    e.preventDefault();

    todo.project = todo.addProject(
      '<i class="las la-tasks"></i>',
      projectName.value
    );

    save(todo.getAllProject());

    renderNewProject();
    addClick();
    renderActiveProject();
    actionHide(projectForm);

    projectName.value = "";
  }

  function handleActions(e) {
    const taskButtonBoxMarkup = `
      <button data-name="cancel-task"  type="button">
        cancel
      </button>

      <button data-name="add-task"  type="button">
        add
      </button>
    `;

    switch (e.target.dataset.name) {
      case "unhide-project":
        actionUnhide(projectForm);
        break;
      case "cancel-project":
        actionHide(projectForm);
        break;
      case "delete-project":
        todo.deleteProject(todo.project.id);
        save(todo.getAllProject());
        init();
        break;
      case "unhide-task":
        actionUnhide(taskForm);
        actionHide(addTaskBox);
        break;
      case "cancel-task":
        actionHide(taskForm);
        actionUnhide(addTaskBox);
        break;
      case "cancel-update":
        actionHide(taskForm);
        actionUnhide(addTaskBox);
        taskButtonBox.innerHTML = taskButtonBoxMarkup;
        clearTaskForm();
        addClick();
        break;
      case "add-task":
        handleTaskForm();
        init();
        break;
      case "update-task":
        const opt = {
          title: taskTitle.value,
          description: taskDescription.value,
          priority: +taskPriority.value,
        };

        todo.project.updateTask(e.target.dataset.id, opt);
        save(todo.getAllProject());

        actionHide(taskForm);
        actionUnhide(addTaskBox);
        clearTaskForm();
        taskButtonBox.innerHTML = taskButtonBoxMarkup;
        init();
        break;
      case "edit-task":
        const task = todo.project.getTask(
          e.target.parentNode.parentNode.dataset.id
        );

        taskButtonBox.innerHTML = `
          <button data-name="cancel-update"  type="button">
            cancel
          </button>

          <button data-name="update-task" data-id=${task.id}  type="button">
            update
          </button>
        `;

        taskTitle.value = task.title;
        taskDescription.value = task.description;
        taskPriority.selectedIndex = task.priority - 1;

        actionUnhide(taskForm);
        actionHide(addTaskBox);
        addClick();
        break;
    }
  }

  function handleTaskForm() {
    if (
      taskTitle.value === "" ||
      taskDescription.value === "" ||
      taskDate.value === ""
    ) {
      alert("can't be an empty field");
      return;
    }

    todo.project.addTask(
      taskTitle.value,
      taskDescription.value,
      new Date(taskDate.value),
      +taskPriority.value,
      false
    );

    save(todo.getAllProject());
    clearTaskForm();
  }

  function clearTaskForm() {
    taskTitle.value = "";
    taskDescription.value = "";
    taskDate.value = "";
    taskPriority.selectedIndex = 0;
  }

  function actionUnhide(element) {
    element.classList.remove("hidden");
  }

  function actionHide(element) {
    element.classList.add("hidden");
  }

  function init() {
    renderAllProject();
    renderActiveProject();
    addClick();
    addSubmit();
  }

  init();
}

// LOCAL STORAGE
function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      (e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

function save(projects) {
  if (storageAvailable("localStorage")) {
    localStorage.setItem("projects", JSON.stringify(projects));
  }
}

function loadLocalStorage() {
  if (!localStorage.getItem("projects")) return;

  return JSON.parse(localStorage.getItem("projects"));
}

setup();
DOM();
