//Buttons
let addBtn = document.getElementById("add");
let saveBtn = document.getElementById("save");
let clearDoneBtn = document.getElementById("clear-done");
let clearAllBtn = document.getElementById("clear-all");

// let optionsMeniu = document.getElementById("task-options");
let taskInput = document.getElementById("task-input");
let header = document.getElementById("landing");
let heartBeat = document.getElementById("heart-beat-wrapper");

let inputField = document.getElementById("todo");

let todoContainer = document.getElementById("todo-container");
let actionsContainer = document.getElementById("actions-container");
let listContainer = document.getElementById("list-container");

let taskList = [];

let backdrop = document.getElementById("backdrop");

let optionApplyBtn = document.getElementById("option-apply");
let optionClearBtn = document.getElementById("option-clear");

let taskAdditionalNote = "";
let taskPriority = "";
let taskDeadline = "";

saveBtn.addEventListener("click", () => {
  if (taskList.length > 0) {
    const taskListJSON = JSON.stringify(taskList);
    localStorage.setItem("task-list", taskListJSON);
  }
  saveBtn.style.animationName = "button-click";
  setTimeout(() => (saveBtn.style.animationName = ""), 1000);
});

clearDoneBtn.addEventListener("click", () => {
  clearDoneBtn.style.animationName = "button-click";
  setTimeout(() => (clearDoneBtn.style.animationName = ""), 1000);
  let newTaskList = taskList.filter(el => el.status !== 'COMPLETED');
  listContainer.innerHTML = "";
  newTaskList.forEach(el => populateElement(listContainer, el))
  localStorage.setItem('task-list', JSON.stringify(newTaskList));
});

clearAllBtn.addEventListener("click", () => {
  clearAllBtn.style.animationName = "button-click";
  setTimeout(() => (clearAllBtn.style.animationName = ""), 1000);
  listContainer.innerHTML = "";
  localStorage.removeItem('task-list');
});

optionApplyBtn.addEventListener("click", (e) => {
  e.preventDefault();

  optionsValidation("APPLY");
});
optionClearBtn.addEventListener("click", (e) => {
  e.preventDefault();
  optionsValidation("CLEAR");
});

function optionsValidation(action) {
  let note = document.getElementById("option-note");
  let priority = document.getElementsByName("priority");
  let deadline = document.getElementById("option-deadline");

  if (action === "CLEAR") {
    note.value = "";
    priority.forEach((element) => {
      element.checked = false;
    });
    deadline.value = "";

    backdrop.style.display = "none";
    if (inputField.value.trim() !== "") {
        let newTask = new TaskConstructor(
          Date.now(),
          inputField.value,
          "ONGOING",
          undefined,
          undefined,
          undefined
        );
      taskList.push(newTask);
      listContainer.style.display = "block";
      populateElement(listContainer, newTask);
      inputField.value = "";
    } else inputField.focus();
  }

  if (action === "APPLY") {
    let priorityColor, noteDescription, deadlineDate;

    if (note.value.trim() !== "") noteDescription = note.value;

    priority.forEach((element) => {
      if (element.checked) priorityColor = element.value.replace('1)', '0.5)');
      console.log('was:', element.value)
      console.log('should be:', priorityColor)
    });
    console.log(priorityColor)

    if (deadline.value !== "") deadlineDate = deadline.valueAsDate;

    if (!priorityColor && !noteDescription && !deadlineDate) {
      note.focus();
      return;
    }

    backdrop.style.display = "none";
    if (inputField.value.trim() !== "") {
      let newTask = new TaskConstructor(
        Date.now(),
        inputField.value,
        "ONGOING",
        noteDescription,
        priorityColor,
        deadlineDate
      );

      taskList.push(newTask);
      populateElement(listContainer, newTask);
      listContainer.style.display = "block";
      inputField.value = "";

      console.log(taskList[0]);
    } else if (note.value.trim() !== "") {
      let newTask = new TaskConstructor(
        Date.now(),
        note.value,
        "ONGOING",
        noteDescription,
        priorityColor,
        deadlineDate
      );

      taskList.push(newTask);
      populateElement(listContainer, newTask);
      listContainer.style.display = "block";
      inputField.value = "";

      console.log(taskList[0]);
    }
    note.value = "";
    priority.forEach((element) => {
      element.checked = false;
    });
    deadline.value = "";
  }
}

function populateElement(target, data, element = "li") {
  let childNode = document.createElement(element);
  childNode.id = data.id;
  childNode.description = data.note;
  childNode.priority = data.priority;
  childNode.deadline = data.deadline;
  childNode.status = data.status;
  childNode.note = data.note;
  childNode.innerText = data.title;

  if (data.note && inputField.value.trim() !== "") {
    let noteNode = document.createElement("span");
    noteNode.setAttribute("description", data.note);
    noteNode.classList.add("note-tooltip");
    noteNode.innerText = data.note;
    childNode.style.position = "relative";
    childNode.appendChild(noteNode);
  }
  if (data.priority) {
    childNode.style.backgroundColor = data.priority;
  }
  childNode.addEventListener("click", (e) => {
    gaDoneba(e.target);
  });
  target.appendChild(childNode);
}

function gaDoneba(element) {
  element.style.textDecoration = "line-through";
  element.style.fontStyle = "italic";
  element.style.backgroundColor = "rgba(143, 180, 180, 0.549)";
  element.status = 'COMPLETED';
  taskList = taskList.map(el => {
    if(el.id === element.id) el.status = 'COMPLETED';
    return el;
  }  )
  console.log(taskList)
}

header.addEventListener("click", () => {
  header.style.animationName = "header-landing";
  header.style.animationDuration = "2s";
  header.style.animationIterationCount = "1";
  header.style.cursor = "default";
  addBtn.style.cursor = "pointer";
  saveBtn.style.cursor = "pointer";
  clearAllBtn.style.cursor = "pointer";
  clearDoneBtn.style.cursor = "pointer";
  inputField.style.cursor = "auto";
  taskInput.style.animationName = "in-da-house";
  heartBeat.style.display = "none";
  listContainer.style.animationName = "in-da-house";
});

inputField.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    let newTask = new TaskConstructor(
      Date.now(),
      inputField.value,
      "ONGOING",
      undefined,
      undefined,
      undefined
    );
    taskList.push(newTask);
    listContainer.style.display = "block";
    populateElement(listContainer, newTask);
    inputField.value = "";
  }
});

header.addEventListener("load", () => {});

actionsContainer.addEventListener("load", () => {});

addBtn.addEventListener("click", () => {
  // let additionalOptions = document.getElementById('additional-optons');
  // if(inputField.value.trim() !== '' && additionalOptions.checked){

  // }
  backdrop.style.display = "block";
  //   optionsMeniu.style.display = "block";
  //   const id = Date.now();
  //   const title = inputField.value;
  //   const priority = "";
  //   const deadLine = "";
  //   const status = "";

  //   taskList.push({ id, title, priority, status });
});

function TaskConstructor(id, title, status, note, priority, deadline) {
  this.id = id.toString();
  this.title = title;
  this.status = status;
  this.note = note;
  this.priority = priority;
  this.deadline = deadline;
}

window.addEventListener("load", () => {
  let tempTaskList = JSON.parse(localStorage.getItem("task-list"));
  
  if (tempTaskList) {
    tempTaskList.forEach(el => populateElement(listContainer, el))
  }
});
