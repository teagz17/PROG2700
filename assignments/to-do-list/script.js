document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("task-input");
    const addTaskButton = document.getElementById("add-task");
    const taskList = document.getElementById("task-list");

    // Load saved tasks from localStorage
    loadTasks();

    addTaskButton.addEventListener("click", function () {
        if (taskInput.value.trim() === "") {
            alert("Task cannot be empty!");
            return;
        }
        createTaskElement(taskInput.value);
        saveTasks();
        taskInput.value = "";
    });

    function createTaskElement(taskText, isCompleted = false) {
        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = isCompleted;
        if (isCompleted) li.classList.add("completed");
        checkbox.addEventListener("change", function () {
            li.classList.toggle("completed", checkbox.checked);
            saveTasks();
        });

        const taskSpan = document.createElement("span");
        taskSpan.textContent = taskText;

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", function () {
            const newText = prompt("Edit your task:", taskSpan.textContent);
            if (newText !== null && newText.trim() !== "") {
                taskSpan.textContent = newText;
                saveTasks();
            }
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function () {
            li.remove();
            saveTasks();
        });

        li.appendChild(checkbox);
        li.appendChild(taskSpan);
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll("#task-list li").forEach((li) => {
            const text = li.querySelector("span").textContent;
            const completed = li.classList.contains("completed");
            tasks.push({ text, completed });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        savedTasks.forEach((task) => createTaskElement(task.text, task.completed));
    }
});