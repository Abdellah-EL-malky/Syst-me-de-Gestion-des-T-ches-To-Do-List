document.addEventListener("DOMContentLoaded", function() {
    const modalToggle = document.querySelector('[data-modal-toggle="crud-modal"]');
    const modal = document.getElementById("crud-modal");
    const closeModalButton = modal.querySelector('[data-modal-toggle="crud-modal"]');
    const addTaskForm = modal.querySelector("form");

    const todoList = document.querySelector(".todo-column .task-list");
    const inProgressList = document.querySelector(".in-progress-column .task-list");
    const doneList = document.querySelector(".done-column .task-list");

    modalToggle.addEventListener("click", function() {
        modal.classList.remove("hidden");
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

        if (!taskName || !taskCategory || !taskPriority || !taskDeadline) {
            alert("Veuillez remplir tous les champs du formulaire.");
            return;
        }

        const taskElement = document.createElement("div");
        taskElement.classList.add("dark:bg-gray-600", "dark:hover:bg-gray-500", "dark:text-white", "p-4", "rounded-lg", "shadow", "border-l-4");

        if (taskPriority === "P1") {
            taskElement.classList.add("border-red-500");
        } else if (taskPriority === "P2") {
            taskElement.classList.add("border-yellow-500");
        } else {
            taskElement.classList.add("border-green-500");
        }

        taskElement.innerHTML = `
            <h3 class="font-medium">${taskName}</h3>
            <h4>${taskDeadline}</h4>
            <span class="bg-${taskPriority === "P1" ? "red" : taskPriority === "P2" ? "yellow" : "green"}-100 text-${taskPriority === "P1" ? "red" : taskPriority === "P2" ? "yellow" : "green"}-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">${taskPriority}</span>
            <div class="mt-2">
                <button class="delete-btn bg-red-500 text-white px-2 py-1 rounded text-xs mr-2 hover:bg-red-400">Delete</button>
                <button class="edit-btn bg-yellow-500 text-white px-2 py-1 rounded text-xs hover:bg-yellow-300">Edit</button>
            </div>
        `;

        if (taskCategory === "To do") {
            todoList.appendChild(taskElement);
        } else if (taskCategory === "In progress") {
            inProgressList.appendChild(taskElement);
        } else if (taskCategory === "Done") {
            doneList.appendChild(taskElement);
        }

        addTaskForm.reset();
        modal.classList.add("hidden");

        updateCounters();
    });

    function updateCounters() {
        const todoCount = todoList.childElementCount;
        const inProgressCount = inProgressList.childElementCount;
        const doneCount = doneList.childElementCount;

        document.querySelector(".todo-column .todocounter").textContent = todoCount;
        document.querySelector(".in-progress-column .todocounter").textContent = inProgressCount;
        document.querySelector(".done-column .todocounter").textContent = doneCount;
    }
});
