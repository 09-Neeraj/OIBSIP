// =========================
// SELECT ELEMENTS
// =========================

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");
const taskCount = document.getElementById("taskCount");
const clearCompletedBtn = document.getElementById("clearCompleted");
const filterButtons = document.querySelectorAll(".filter-btn");


// =========================
// TASK DATA
// =========================

let tasks = JSON.parse(localStorage.getItem("todoTasks")) || [];

let currentFilter = "all";


// =========================
// SAVE TASKS
// =========================

function saveTasks() {
    localStorage.setItem("todoTasks", JSON.stringify(tasks));
}


// =========================
// ADD TASK
// =========================

function addTask() {

    const taskText = taskInput.value.trim();

    // Don't add empty task
    if (taskText === "") {
        alert("Please enter a task.");
        taskInput.focus();
        return;
    }

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();

    taskInput.value = "";

    taskInput.focus();

    renderTasks();
}


// =========================
// RENDER TASKS
// =========================

function renderTasks() {

    taskList.innerHTML = "";

    // Filter tasks
    let filteredTasks = tasks;

    if (currentFilter === "pending") {

        filteredTasks = tasks.filter(task => !task.completed);

    } else if (currentFilter === "completed") {

        filteredTasks = tasks.filter(task => task.completed);

    }


    // Empty message
    if (filteredTasks.length === 0) {

        emptyMessage.style.display = "block";

    } else {

        emptyMessage.style.display = "none";
    }


    // Create task elements
    filteredTasks.forEach(task => {

        const li = document.createElement("li");

        li.className = "task-item";

        if (task.completed) {
            li.classList.add("completed");
        }


        // Checkbox
        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.className = "task-checkbox";

        checkbox.checked = task.completed;

        checkbox.addEventListener("change", () => {

            toggleTask(task.id);

        });


        // Task text
        const taskText = document.createElement("span");

        taskText.className = "task-text";

        taskText.textContent = task.text;


        // Actions container
        const actions = document.createElement("div");

        actions.className = "task-actions";


        // Edit button
        const editButton = document.createElement("button");

        editButton.className = "edit-btn";

        editButton.textContent = "✏️";

        editButton.title = "Edit Task";

        editButton.addEventListener("click", () => {

            editTask(task.id);

        });


        // Delete button
        const deleteButton = document.createElement("button");

        deleteButton.className = "delete-btn";

        deleteButton.textContent = "🗑️";

        deleteButton.title = "Delete Task";

        deleteButton.addEventListener("click", () => {

            deleteTask(task.id);

        });


        // Add buttons
        actions.appendChild(editButton);

        actions.appendChild(deleteButton);


        // Add everything to task
        li.appendChild(checkbox);

        li.appendChild(taskText);

        li.appendChild(actions);


        taskList.appendChild(li);

    });


    updateTaskCount();
}


// =========================
// COMPLETE / UNCOMPLETE
// =========================

function toggleTask(id) {

    tasks = tasks.map(task => {

        if (task.id === id) {

            return {
                ...task,
                completed: !task.completed
            };
        }

        return task;
    });


    saveTasks();

    renderTasks();
}


// =========================
// EDIT TASK
// =========================

function editTask(id) {

    const task = tasks.find(task => task.id === id);

    if (!task) {
        return;
    }


    const updatedText = prompt(
        "Edit your task:",
        task.text
    );


    if (updatedText === null) {
        return;
    }


    const newText = updatedText.trim();

    if (newText === "") {

        alert("Task cannot be empty.");

        return;
    }


    task.text = newText;

    saveTasks();

    renderTasks();
}


// =========================
// DELETE TASK
// =========================

function deleteTask(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this task?"
    );


    if (!confirmDelete) {
        return;
    }


    tasks = tasks.filter(task => task.id !== id);

    saveTasks();

    renderTasks();
}


// =========================
// UPDATE TASK COUNT
// =========================

function updateTaskCount() {

    const pendingTasks = tasks.filter(
        task => !task.completed
    ).length;


    if (pendingTasks === 1) {

        taskCount.textContent = "1 task left";

    } else {

        taskCount.textContent =
            `${pendingTasks} tasks left`;
    }
}


// =========================
// FILTER TASKS
// =========================

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        // Remove active from all buttons
        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        // Add active to clicked button
        button.classList.add("active");


        // Set current filter
        currentFilter = button.dataset.filter;


        renderTasks();
    });
});


// =========================
// CLEAR COMPLETED
// =========================

clearCompletedBtn.addEventListener("click", () => {

    const completedTasks = tasks.filter(
        task => task.completed
    );


    if (completedTasks.length === 0) {

        alert("There are no completed tasks.");

        return;
    }


    const confirmClear = confirm(
        "Clear all completed tasks?"
    );


    if (!confirmClear) {
        return;
    }


    tasks = tasks.filter(
        task => !task.completed
    );


    saveTasks();

    renderTasks();
});


// =========================
// ADD BUTTON CLICK
// =========================

addTaskBtn.addEventListener("click", addTask);


// =========================
// ENTER KEY
// =========================

taskInput.addEventListener("keydown", event => {

    if (event.key === "Enter") {

        addTask();
    }
});


// =========================
// INITIAL RENDER
// =========================

renderTasks();