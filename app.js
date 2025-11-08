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
}

listContainer.addEventListener("click", function(e) {
    if(e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
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