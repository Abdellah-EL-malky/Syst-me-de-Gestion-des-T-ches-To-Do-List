document.addEventListener("DOMContentLoaded", function() {
    const modalToggle = document.querySelector('[data-modal-toggle="crud-modal"]');
    const modal = document.getElementById("crud-modal");
    const closeModalButton = modal.querySelector('[data-modal-toggle="crud-modal"]');
    const addTaskForm = modal.querySelector("form");
    const todoList = document.querySelector(".todo-list");
    const inProgressList = document.querySelector(".in-progress-list");
    const doneList = document.querySelector(".done-list");

    // Ouvrir/Fermer le modal
    modalToggle.addEventListener("click", function() {
        modal.classList.toggle("hidden");
    });
    
    closeModalButton.addEventListener("click", function() {
        modal.classList.add("hidden");
    });

    // Ajouter une tâche
    addTaskForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const taskName = document.getElementById("name").value;
        const taskCategory = document.getElementById("category").value;
        const taskPriority = document.getElementById("priority").value;
        const taskDeadline = document.getElementById("taskDeadline").value;

        // Créer l'élément de tâche
        const taskElement = document.createElement("div");
        taskElement.classList.add("dark:bg-gray-600", "dark:hover:bg-gray-500", "dark:text-white", "p-4", "rounded-lg", "shadow", "border-l-4");

        // Définir la couleur de la bordure en fonction de la priorité
        if (taskPriority === "P1") {
            taskElement.classList.add("border-red-500");
        } else if (taskPriority === "P2") {
            taskElement.classList.add("border-yellow-500");
        } else {
            taskElement.classList.add("border-green-500");
        }

        // Ajouter le contenu de la tâche
        taskElement.innerHTML = `
            <h3 class="font-medium">${taskName}</h3>
            <span class="priority-tag">${taskPriority}</span>
            <div class="mt-2">
                <button class="delete-btn bg-red-500 text-white px-2 py-1 rounded text-xs mr-2 hover:bg-red-400">Delete</button>
                <button class="edit-btn bg-yellow-500 text-white px-2 py-1 rounded text-xs hover:bg-yellow-300">Edit</button>
            </div>
        `;

        // Ajouter la tâche à la liste de la catégorie correspondante
        if (taskCategory === "To do") {
            todoList.appendChild(taskElement);
        } else if (taskCategory === "In progress") {
            inProgressList.appendChild(taskElement);
        } else if (taskCategory === "Done") {
            doneList.appendChild(taskElement);
        }

        // Réinitialiser le formulaire et fermer le modal
        addTaskForm.reset();
        modal.classList.add("hidden");

        // Mettre à jour le compteur de tâches
        updateCounters();
    });

    // Fonction pour mettre à jour les compteurs
    function updateCounters() {
        const todoCount = todoList.childElementCount;
        const inProgressCount = inProgressList.childElementCount;
        const doneCount = doneList.childElementCount;

        document.querySelector(".todocounter").textContent = todoCount;
        document.querySelector(".inprogresscounter").textContent = inProgressCount;
        document.querySelector(".donecounter").textContent = doneCount;
    }
});
