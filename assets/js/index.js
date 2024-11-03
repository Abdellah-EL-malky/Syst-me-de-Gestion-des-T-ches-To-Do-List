document.addEventListener("DOMContentLoaded", function() {
    const modalToggle = document.querySelector('[data-modal-toggle="crud-modal"]');
    const modal = document.getElementById("crud-modal");
    const closeModalButton = modal.querySelector('[data-modal-toggle="crud-modal"]');
    const addTaskForm = modal.querySelector("form");

    const todoList = document.querySelector(".todo-column .task-list");
    const inProgressList = document.querySelector(".in-progress-column .task-list");
    const doneList = document.querySelector(".done-column .task-list");

    const errorMessage = document.createElement("div");
    errorMessage.classList.add("text-red-500", "mb-2");
    addTaskForm.prepend(errorMessage);

    modalToggle.addEventListener("click", function() {
        modal.classList.remove("hidden");
    });

    closeModalButton.addEventListener("click", function() {
        modal.classList.add("hidden");
    });

    addTaskForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const taskName = document.getElementById("name").value.trim();
        const taskCategory = document.getElementById("category").value;
        const taskPriority = document.getElementById("priority").value;
        const taskDeadline = document.getElementById("taskDeadline").value;
        const taskDescription = document.getElementById("description").value.trim();

        errorMessage.textContent = "";

        const nameRegex = /^[a-zA-Z\sÀ-ÖØ-öø-ÿ]+$/;
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

        if (!taskName || !taskCategory || !taskPriority || !taskDeadline || !taskDescription) {
            errorMessage.textContent = "Please fill in all fields in the form.";
            return;
        }

        if (!nameRegex.test(taskName)) {
            errorMessage.textContent = "The task name must contain only letters and spaces.";
            return;
        }

        const taskElement = document.createElement("div");
        taskElement.classList.add(
            "task-item",
            "dark:bg-gray-600",
            "dark:hover:bg-gray-500",
            "dark:text-white",
            "p-4",
            "rounded-lg",
            "shadow",
            "border-l-4"
        );

        if (taskPriority === "P1") {
            taskElement.classList.add("border-red-500");
        } else if (taskPriority === "P2") {
            taskElement.classList.add("border-yellow-500");
        } else {
            taskElement.classList.add("border-green-500");
        }

        function getPriorityClasses(priority) {
            if (priority === "P1") {
                return "bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300";
            } else if (priority === "P2") {
                return "bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300";
            } else if (priority === "P3") {
                return "bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300";
            } else {
                return "";
            }
        }

        taskElement.innerHTML = `
            <h3 class="font-medium">${taskName}</h3>
            <h4>${taskDeadline}</h4>
            <span class="${getPriorityClasses(taskPriority)}">${taskPriority}</span>
            <div class="mt-2">
                <button class="delete-btn bg-red-500 text-white px-2 py-1 rounded text-xs mr-2 hover:bg-red-400">Delete</button>
                <select class="status-select bg-yellow-500 text-white px-2 py-1 rounded text-xs hover:bg-yellow-300">
                    <option value="To do" ${taskCategory === "To do" ? "selected" : ""}>To do</option>
                    <option value="In progress" ${taskCategory === "In progress" ? "selected" : ""}>In progress</option>
                    <option value="Done" ${taskCategory === "Done" ? "selected" : ""}>Done</option>
                </select>
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

    function changeTaskStatus(taskElement, newStatus) {
        taskElement.parentNode.removeChild(taskElement);

        if (newStatus === "To do") {
            todoList.appendChild(taskElement);
        } else if (newStatus === "In progress") {
            inProgressList.appendChild(taskElement);
        } else if (newStatus === "Done") {
            doneList.appendChild(taskElement);
        }

        updateCounters();
    }

    document.addEventListener("change", function(event) {
        if (event.target && event.target.classList.contains("status-select")) {
            const taskElement = event.target.closest(".task-item");
            const newStatus = event.target.value;
            changeTaskStatus(taskElement, newStatus);
        }
    });

    function deleteTask(taskElement) {
        taskElement.parentNode.removeChild(taskElement);

        updateCounters();
    }

    document.addEventListener("click", function(event) {
        if (event.target && event.target.classList.contains("delete-btn")) {
            const taskElement = event.target.closest(".task-item");
            deleteTask(taskElement);
        }
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
