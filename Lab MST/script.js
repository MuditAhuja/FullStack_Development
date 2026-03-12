const taskInput = document.querySelector("#taskInput");
const priority = document.querySelector("#priority");
const addBtn = document.querySelector("#addTask");
const taskList = document.querySelector("#taskList");
const all = document.querySelector("#showAll")
const completed = document.querySelector("#showCompleted")
const pending = document.querySelector("#showPending")

let tasks = [];
let currentFilter = "all";

addBtn.addEventListener("click", addTask);

all.addEventListener("click", () => filterTasks("all"));
completed.addEventListener("click", () => filterTasks("completed"));
pending.addEventListener("click", () => filterTasks("pending"));

function addTask() {

    const taskText = taskInput.value;
    const taskPriority = priority.value;

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        priority: taskPriority,
        completed: false
    };

    tasks.push(task);

    taskInput.value = "";

    renderTasks(currentFilter);
}
function renderTasks(filter) {

    currentFilter = filter;
    taskList.innerHTML = "";
    let filteredTasks = tasks;
    if (filter === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
    }
    if (filter === "pending") {
        filteredTasks = tasks.filter(task => !task.completed);
    }
    filteredTasks.forEach(task => {

        const li = document.createElement("li");
        if (task.completed) {
            li.classList.add("completed");
        }
        if(task.priority === "High")
            priorityClass = "priority-high"
        else if(task.priority === "Medium")
            priorityClass = "priority-medium"
        else
            priorityClass = "priority-low"

        li.innerHTML = `
        <div class="${priorityClass}">
            ${task.text} (${task.priority})
        </div>
        <div>
            <button class="complete-btn">✔</button>
            <button class="delete-btn">Delete</button>
        </div>
        `;

        const completeBtn = li.querySelector(".complete-btn");
        const deleteBtn = li.querySelector(".delete-btn");

        completeBtn.addEventListener("click", () => {
            toggleComplete(task.id);
        });

        deleteBtn.addEventListener("click", () => {
            deleteTask(task.id);
        });

        taskList.appendChild(li);
    });
}

function toggleComplete(id) {

    tasks = tasks.map(task => {
        if (task.id === id) {
            task.completed = !task.completed;
        }

        return task;
    });
    renderTasks(currentFilter);
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks(currentFilter);
}

function filterTasks(type) {
    renderTasks(type);
}