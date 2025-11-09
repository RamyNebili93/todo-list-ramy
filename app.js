const todoInput = document.getElementById("todo-input");
const listContainer = document.getElementById("list-container");

todoInput.addEventListener("keydown", function(event) {
    if(event.key === "Enter") {
        addTask();
    }
});

function addTask() {
    if(todoInput.value === '') {
        alert("Vous devez écrire une tâche !");
    } else {
        const li = document.createElement("li");
        li.textContent = todoInput.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.textContent = "\u00d7";
        li.appendChild(span);
    }
    todoInput.value = "";
    saveData();
    updateCounter();
}

listContainer.addEventListener("click", function(e) {
    if(e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
        updateCounter();
    }
    else if(e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
        updateCounter();
    }
}, false);

/*Sauvegarder les données*/
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}
/*Afficher les tâches sauvegardées*/
 function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();

function updateCounter() {
    const totalTasks = document.querySelectorAll("#list-container li").length;
    const doneTasks = document.querySelectorAll("#list-container li.checked").length;
    const counter = document.getElementById("counter");
    counter.textContent = doneTasks + "/" + totalTasks + " tâches terminées";
}
updateCounter();

function filterTasks(type, btn) {
    const tasks = document.querySelectorAll("#list-container li");
    tasks.forEach(task => {
        const isDone = task.classList.contains("checked");

        if (type === "all") {
            task.style.display = "block";
        } else if (type === "done" && isDone) {
            task.style.display = "block";
        } else if (type === "todo" && !isDone) {
            task.style.display = "block";
        } else {
            task.style.display = "none";
        }
    });

    const filterButtons = document.querySelectorAll(".filters button");
    filterButtons.forEach(button => button.classList.remove("active"));
    if (btn) {
        btn.classList.add("active");
    }
}

    const firstFilterBtn = document.querySelector(".filters button");
    filterTasks("all", firstFilterBtn);