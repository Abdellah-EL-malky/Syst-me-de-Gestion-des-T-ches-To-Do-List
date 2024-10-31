document.addEventListener("DOMContentLoaded", function() {
    const modalToggle = document.querySelector('[data-modal-toggle="crud-modal"]');
    const modal = document.getElementById("crud-modal");
    const closeModalButton = modal.querySelector('[data-modal-toggle="crud-modal"]');
    const addTaskForm = modal.querySelector("form");
    const todoList = document.querySelector(".todo-list");
    const inProgressList = document.querySelector(".in-progress-list");
    const doneList = document.querySelector(".done-list");

    let taskBeingEdited = null;

    modalToggle.addEventListener("click", function() {
        modal.classList.toggle("hidden");
    });

    closeModalButton.addEventListener("click", function() {
        modal.classList.add("hidden");
    });

    addTaskForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const taskName = document.getElementById("name").value;
        const taskCategory = document.getElementById("category").value;
        const taskPriority = document.getElementById("priority").value;
        const taskDeadline = document.getElementById("taskDeadline").value;

        if (taskBeingEdited) {
            updateTask(taskBeingEdited, taskName, taskCategory, taskPriority, taskDeadline);
            taskBeingEdited = null; 
        } else {
            createTask(taskName, taskCategory, taskPriority, taskDeadline);
        }

        addTaskForm.reset();
        modal.classList.add("hidden");

        updateCounters();
    });

    function createTask(name, category, priority, deadline) {
        const taskElement = document.createElement("div");
        taskElement.classList.add("dark:bg-gray-600", "dark:hover:bg-gray-500", "dark:text-white", "p-4", "rounded-lg", "shadow", "border-l-4");

        if (priority === "P1") {
            taskElement.classList.add("border-red-500");
        } else if (priority === "P2") {
            taskElement.classList.add("border-yellow-500");
        } else {
            taskElement.classList.add("border-green-500");
        }

        taskElement.innerHTML = `
            <h3 class="font-medium">${name}</h3>
            <span class="priority-tag">${priority}</span>
            <p class="deadline">${deadline}</p>
            <div class="mt-2">
                <button class="delete-btn bg-red-500 text-white px-2 py-1 rounded text-xs mr-2 hover:bg-red-400">Delete</button>
                <button class="edit-btn bg-yellow-500 text-white px-2 py-1 rounded text-xs hover:bg-yellow-300">Edit</button>
            </div>
        `;

        taskElement.querySelector(".delete-btn").addEventListener("click", function() {
            taskElement.remove();
            updateCounters();
        });

        taskElement.querySelector(".edit-btn").addEventListener("click", function() {
            editTask(taskElement, name, category, priority, deadline);
        });

        if (category === "To do") {
            todoList.appendChild(taskElement);
        } else if (category === "In progress") {
            inProgressList.appendChild(taskElement);
        } else if (category === "Done") {
            doneList.appendChild(taskElement);
        }
    }

    function editTask(taskElement, name, category, priority, deadline) {
        document.getElementById("name").value = name;
        document.getElementById("category").value = category;
        document.getElementById("priority").value = priority;
        document.getElementById("taskDeadline").value = deadline;
        
        taskBeingEdited = taskElement;
        modal.classList.remove("hidden");
    }

    function updateTask(taskElement, name, category, priority, deadline) {
        taskElement.querySelector("h3").textContent = name;
        taskElement.querySelector(".priority-tag").textContent = priority;
        taskElement.querySelector(".deadline").textContent = deadline;

        taskElement.classList.remove("border-red-500", "border-yellow-500", "border-green-500");
        if (priority === "P1") {
            taskElement.classList.add("border-red-500");
        } else if (priority === "P2") {
            taskElement.classList.add("border-yellow-500");
        } else {
            taskElement.classList.add("border-green-500");
        }

        if (category === "To do") {
            todoList.appendChild(taskElement);
        } else if (category === "In progress") {
            inProgressList.appendChild(taskElement);
        } else if (category === "Done") {
            doneList.appendChild(taskElement);
        }
    }

    function updateCounters() {
        const todoCount = todoList.childElementCount;
        const inProgressCount = inProgressList.childElementCount;
        const doneCount = doneList.childElementCount;

        document.querySelector(".todocounter").textContent = todoCount;
        document.querySelector(".inprogresscounter").textContent = inProgressCount;
        document.querySelector(".donecounter").textContent = doneCount;
    }
});
