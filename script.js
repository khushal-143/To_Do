const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
<<<<<<< HEAD
const addBtn = document.getElementById("add-btn");

let editTask = null;

function addTask() {

    if (inputBox.value.trim() === '') {
        alert("Write Something!");
        return;
    }

    // Update existing task
    if (editTask) {

        editTask.childNodes[0].textContent = inputBox.value;

        editTask = null;
        addBtn.innerText = "Add";

        inputBox.value = "";
        saveData();
        return;
    }

    // Add new task
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(inputBox.value));

    // Edit button
    let editBtn = document.createElement("button");
    editBtn.innerHTML = "✏️";
    editBtn.className = "edit-btn";

    // Delete button
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";

    li.appendChild(editBtn);
    li.appendChild(span);

    listContainer.appendChild(li);

    inputBox.value = "";

    saveData();
}
listContainer.addEventListener("click", function (e) {

    // Complete task
    if (e.target.tagName === "LI") {

        e.target.classList.toggle("checked");
        saveData();
    }

    // Delete task
    else if (e.target.tagName === "SPAN") {

        e.target.parentElement.remove();

        if (editTask === e.target.parentElement) {
            editTask = null;
            addBtn.innerText = "Add";
            inputBox.value = "";
        }

        saveData();
    }

    // Edit task
    else if (e.target.classList.contains("edit-btn")) {

        editTask = e.target.parentElement;

        inputBox.value = editTask.childNodes[0].textContent;

        addBtn.innerText = "Update";

        inputBox.focus();
    }

=======

function addTask() {
    if (inputBox.value === '') {
        alert("Write Something!");
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    }
    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
>>>>>>> fa282f2fb0226c7c21f713d335894b35c7ee1cb6
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showData() {
    listContainer.innerHTML = localStorage.getItem("data");
}
showData();